let http = require('http');
let querystring = require('querystring');

let records = {};

http.createServer(function (req, res) {
  if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      let data = querystring.parse(body);
      
      records[data.id] = {
        name: data.name,
        id: data.id,
        email: data.email,
        mobile: data.mobile,
        license: data.license,
        status: 'under_review'
      };

      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`
        <div style="text-align: center; font-family: Arial;">
          <h2>تم استلام طلبك بنجاح</h2>
          <p>الحالة الحالية: <strong>قيد المراجعة</strong></p>
          <p>لن يتم تفعيل الحساب حتى يتم مراجعة الترخيص من قبل الإدارة.</p>
        </div>
      `);
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <style>
        form { max-width: 300px; margin: 50px auto; display: flex; flex-direction: column; gap: 10px; }
        input, button { padding: 8px; }
      </style>
      <form action="/submit" method="POST">
        <input name="name" placeholder="الاسم الكامل" required>
        <input name="id" placeholder="رقم الهوية" required>
        <input name="email" type="email" placeholder="البريد الإلكتروني" required>
        <input name="mobile" placeholder="رقم الجوال" required>
        <label>رفع ملف الترخيص:</label>
        <input type="file" name="license" required>
        <button type="submit">إرسال البيانات</button>
      </form>
    `);
  }
}).listen(6969);