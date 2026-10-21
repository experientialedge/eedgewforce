export function smtpConfiguration(env = process.env) {
  const host=String(env.SMTP_HOST||'smtp.resend.com').trim().toLowerCase();
  const port=Number(env.SMTP_PORT||465),user=String(env.SMTP_USER||env.EMAIL_USER||'').trim();
  const gmail=host==='smtp.gmail.com';
  const rawPass=env.SMTP_PASS||env.EMAIL_PASS||'',pass=gmail?rawPass.replace(/\s/g,''):rawPass;
  const from=String(env.EMAIL_FROM||'').trim();
  let issue=null;
  if(!user||!pass||!from)issue='Set SMTP_USER, SMTP_PASS and EMAIL_FROM in the production environment.';
  else if(!host||!Number.isInteger(port)||![465,587].includes(port))issue='Use SMTP port 465 (TLS) or 587 (STARTTLS).';
  else if(gmail&&!/^[a-z\d]{16}$/i.test(pass))issue='For Gmail, use a 16-character Google app password with 2-Step Verification enabled.';
  return {host,port,user,pass,from,gmail,secure:port===465,configured:!issue,issue};
}
