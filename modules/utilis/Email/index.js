exports.getMessage = (from, to, subject, html) => {
    const message = {};
    message.from = from;
    message.to = to;
    message.subject = subject;
    message.text = "Mail from taxichajju.";
    message.html = html;
    return message;
};