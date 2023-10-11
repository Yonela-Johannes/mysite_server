const nodemailer = require("nodemailer");

const sendMail = async ({from, to, subject, text}) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: to,
    to:'johannesyonela@gmail.com',
    subject,
    text: `From: ${from}, Email: ${to} ${text}`,
    html: `From: ${from}, Email: ${to} ${text}`,
  });
  if(info?.messageId){
    const message = `I hope this message finds you well.
    I wanted to acknowledge that I've received your email. Thank you for reaching out to me. Your message is important, and I appreciate you taking the time to get in touch.
    I will review your email and respond as soon as possible. Please allow me some time to address your inquiries thoroughly.
    In the meantime, if you have any urgent matters or additional information to share, please don't hesitate to let me know.
    Thank you for your patience, and I look forward to our correspondence.
    Warm regards,
    Yonela Johannes`

    let response = await transporter.sendMail({
      from: '👋 Yonela Johannes',
      to,
      subject: `RE:johannesyonela@gmail.com`,
      text: message,
      html: message,
    });
     if(response?.messageId){
       return 'Message sent'
     }else{
      return 'Response failed'
     }
  } else {
    return 'Message failed'
  }
};

module.exports = sendMail
