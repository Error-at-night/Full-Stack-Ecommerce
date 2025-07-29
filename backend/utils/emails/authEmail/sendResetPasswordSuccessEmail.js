const sendEmail = require('../../sendEmail');

const sendResetPasswordSuccessEmail = async ({ fullName, email }) => {
  const message = `<p>Your password has been reset</p>. 
  <p>If this was not done by you, kindly reach out to the support team</p>`

  return sendEmail({
    to: email,
    subject: 'Reset Password Successful',
    html: `<h4>Hello, ${fullName}</h4>
   ${message}
   `,
  });
};

module.exports = sendResetPasswordSuccessEmail;
