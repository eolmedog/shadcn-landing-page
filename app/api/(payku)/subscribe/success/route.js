import { NextResponse } from "next/server";
import { sign } from "../../utils";
import { supabase } from "../../../../lib/supabaseClient";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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

const get_sub_client = async (client_email) => {
  const slug = `/api/suclient/${client_email}`
  const response = await fetch(`https://${BASE_URL}/api/suclient/${client_email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': sign(slug, client_email),
      'Authorization': `Bearer ${token_publico}`
    },
  });
  const result = await response.json();
  console.log(result);
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

const sendEmail = async (email, username, password) => {
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
        <p>Hola ${username},</p>
        <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales:</p>
        <p><strong>Username:</strong> ${username}</p>
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

const createUser = async (userData) => {
  const { email, name } = userData;

  const username = generateUsername(name);
  const password = generatePassword(username);
  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabase.from("Users").insert([
    {
      email: email,
      name: name,
      username: username,
      password: hashedPassword,
      plan: "basic",
      mustChangePassword: true,
    },
  ]);

  if (error) {
    console.error("Error creating user:", error);
    return false;
  }

  // Send email with username and password
  await sendEmail(email, username, password);

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
  const transaction_id = transaction_data.wetransaction_id;
  const details = await get_transaction(transaction_id);

  if (details && details.status === "success") {
    const client_email = details.email;
    const sub_client_data = await get_sub_client(client_email);

    if (sub_client_data) {
      const existingUser = await checkUserExists(client_email);

      if (!existingUser) {
        const created = await createUser({
          email: client_email,
          name: sub_client_data.name,
        });

        if (created) {
          console.log("User created successfully in Supabase.");
        } else {
          console.log("Failed to create user in Supabase.");
        }
      } else {
        console.log("User already exists in Supabase.");
        if (existingUser.plan === "free" || existingUser.plan === null) {
          const updated = await updateUserPlan(existingUser.id);
          if (updated) {
            console.log("User plan updated to 'basic'.");
          } else {
            console.log("Failed to update user plan.");
          }
        } else {
          console.log("User plan is not 'free' or null, no update needed.");
        }
      }
    } else {
      console.log("sub_client_data is null or undefined");
    }
  } else {
    console.log("Transaction failed or details not available.");
  }
  
}

export async function GET(req) {
    console.log('GET request received')
    const req_data = await req.json();
    console.log(req_data);
}
