import { NextResponse } from "next/server";
import { sign } from "../../utils";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { createClient } from '@supabase/supabase-js'
import crypto from "crypto";
import { create } from "domain";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)



const BASE_URL = process.env.PAYKU_BASE_URL;
const token_publico = process.env.PAYKU_TOKEN_PUBLICO;


const get_transaction = async (transaction_id) => {
    const response = await fetch(`${BASE_URL}/api/transaction/${transaction_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${token_publico}`
      },
    });
    const result = await response.json();
    return result;
  }

const get_sub_client = async (client_email_or_id) => {
  const encodedEmail = encodeURIComponent(client_email_or_id); // Encode email safely
  const slug = `api/suclient/${encodedEmail}`;
  const url = `${BASE_URL}/${slug}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': sign(slug, encodedEmail),
      'Authorization': `Bearer ${token_publico}`
    },
  });
  const result = await response.json();
  return result;
};

const generateUsername = (name) => {
  const nameParts = name.split(" ");
  if (nameParts.length < 2) {
    return nameParts[0].charAt(0).toLowerCase() + nameParts[0].toLowerCase(); // Use the full name if only one name part is available
  }
  const firstNameInitial = nameParts[0].charAt(0).toLowerCase();
  const lastName = nameParts[nameParts.length - 1].toLowerCase();
  return firstNameInitial + lastName;
};

const generatePassword = (username) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return username + randomNumber;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const sendEmail = async (email, name, username, password) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Bienvenido a Automatiza Lo Fome!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Bienvenido a Automatiza Lo Fome!</h2>
        <p>Hola ${name},</p>
        <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales:</p>
        <p><strong>Username:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Por favor, cambia tu contraseña después de iniciar sesión.</p>
        <a href="https://app.automatizalofome.cl/login" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ir a la página de inicio de sesión</a>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const checkUserExists = async (email) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error checking user existence:", error);
    return false;
  }

  if (data.length > 0) {
    return data[0]; // Return the user data if it exists
  }
  return null;
};

const checkUsernameExists = async (username) => {
  const { data, error } = await supabase
    .from("Users")
    .select("username")
    .ilike("username", `${username}%`);

  if (error) {
    console.error("Error checking username existence:", error);
    return [];
  }

  return data.map(user => user.username);
};

const generateUniqueUsername = async (name) => {
  const baseUsername = name.split(" ").map(word => word.toLowerCase()).join(""); // Remove spaces, lowercase
  let username = baseUsername;
  const existingUsernames = await checkUsernameExists(baseUsername);

  if (existingUsernames.length > 0) {
    let counter = 1;
    while (existingUsernames.includes(username)) {
      username = `${baseUsername}${counter}`;
      counter++;
    }
  }

  return username;
};

const createUser = async (userData) => {
  const { email, name } = userData;

  const username = await generateUniqueUsername(name); // Ensure uniqueness
  const password = generatePassword(username);
  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabase.from("Users").insert([
    {
      id: crypto.randomUUID(),
      email: email,
      nombre: name,
      username: username,
      password: hashedPassword,
      plan: "basic",
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ]);

  if (error) {
    console.error("Error creating user:", error);
    return false;
  }

  // Send email with username and password
  await sendEmail(email, name, username, password);

  return true;
};

const updateUserPlan = async (userId) => {
  const { data, error } = await supabase
    .from("Users")
    .update({ plan: "basic" })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user plan:", error);
    return false;
  }

  return true;
};

export async function POST(req) {
  console.log("POST request received");
  const transaction_data = await req.json();
  const user_id = transaction_data.subscriptions.client;
  const transaction_id = transaction_data.transaction_id;
  console.log("Transaction data", transaction_data);
  const details = await get_transaction(transaction_id);
  let client_name;
  let success = false;
  if (details && details.status === "success") {
    const client_email = details.email;
    const sub_client_data = await get_sub_client(user_id);

    if (sub_client_data) {
      const existingUser = await checkUserExists(client_email);
      client_name = sub_client_data.name;

      if (!existingUser) {
        const created = await createUser({
          email: client_email,
          name: client_name,
        });

        if (created) {
          console.log("User created successfully in Supabase.");
          success = true;
        } else {
          console.log("Failed to create user in Supabase.");
        }
        
      } else {
        console.log("User already exists in Supabase.");
        if (existingUser.plan === "free" || existingUser.plan === null) {
          const updated = await updateUserPlan(existingUser.id);
          if (updated) {
            console.log("User plan updated to 'basic'.");
            success = true;
          } else {
            console.log("Failed to update user plan.");
          }
        } else {
          console.log("User plan is not 'free' or null, no update needed.");
          success = true;
        }
        
      }
    } else {
      console.log("sub_client_data is null or undefined");
      success = false
    }
  } else {
    console.log("Transaction failed or details not available.");
    success = false;
  }
  if (success) {
    return new Response(JSON.stringify({success}), { status: 200 });
  } else {
    return new Response(JSON.stringify({success}), { status: 500 });
  }

  
}

