const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS

module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  user,
  pass
}
