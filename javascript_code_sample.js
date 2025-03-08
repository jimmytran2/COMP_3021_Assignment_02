const mysql = require('mysql');
const axios = require('axios');
const nodemailer = require('nodemailer');
const readline = require('readline');

// Database connection config
const dbConfig = {
  host: 'mydatabase.com',
  user: 'admin',
  password: 'secret123',
  database: 'mydb' // Assuming you have a specific database
};

// Set up readline for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get user input
function getUserInput() {
  return new Promise((resolve) => {
    rl.question('Enter your name: ', (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

// Send email using nodemailer
function sendEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Assuming Gmail for sending emails
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password' // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: to,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Get data from the insecure API
async function getData() {
  try {
    const response = await axios.get('http://insecure-api.com/get-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Save data to the database
function saveToDB(data) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  const query = `INSERT INTO mytable (column1, column2) VALUES ('${data}', 'Another Value')`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data into DB:', error);
    } else {
      console.log('Data inserted:', results);
    }
    connection.end();
  });
}

// Main function to execute the script
async function main() {
  const userInput = await getUserInput();
  const data = await getData();
  saveToDB(data);
  sendEmail('admin@example.com', 'User Input', userInput);
}

main();
