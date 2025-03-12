import {NextResponse} from "next/server";
import {sign} from "../../utils";
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
  console.log(result)
}

request(data);


export async function POST(req) {
    console.log('POST request received')
    const transaction_data = await req.json();
    const transaction_id = transaction_data.wetransaction_id
    const details = await get_transaction(transaction_id);

    if (details && details.status === 'success') {
        const client_email = details.email;
        const sub_client_data = await get_sub_client(client_email);
        console.log(sub_client_data);
    } else {
        console.log("Transaction failed or details not available.");
    }
}

export async function GET(req) {
    console.log('GET request received')
    const req_data = await req.json();
    console.log(req_data);
}
