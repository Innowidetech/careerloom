import nodemailer from "nodemailer";

export  const sendMail = async ( to, subject, text,html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID_FORGOT,
      pass: process.env.EMAIL_PASS_FORGOT,
    },
  });


  let mailOptions = {
    from: process.env.EMAIL_ID_FORGOT,
    to: to,
    subject: subject,
    text: text,
    html:html,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
};


