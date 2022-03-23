var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateHTML(title, list, body, control) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("../data", function (error, filelist) {
        var title = "Welcome";
        var description = "hello, Node.js";
        var list = templateList(filelist);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2> <p>${description}</p>`,
          `<a href="/create">create</a>`
        );

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("../data", function (error, filelist) {
        fs.readFile(
          `../data/${queryData.id}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(
              title,
              list,
              `<h2>${title}</h2> <p>${description}</p>`,
              `<a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
              </form>`
            );
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("../data", function (error, filelist) {
      var title = "WEB - Create";
      var list = templateList(filelist);
      var template = templateHTML(
        title,
        list,
        `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>`,
        ``
      );

      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      //request에 data가 있을 경우 처리 하는 부분
      body += data;
    });
    request.on("end", function () {
      //data 처리가 다 끝난 경우
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;

      // fs.writeFile(filename, content, encoding, callback)
      fs.writeFile(`../data/${title}`, description, "utf-8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("../data", function (error, filelist) {
      fs.readFile(
        `../data/${queryData.id}`,
        "utf8",
        function (err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(
            title,
            list,
            `<form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" value="${title}"/></p>
              <p>
                <textarea name="description"> ${description}</textarea>
              </p>
              <p>
                <input type="submit" />
              </p>
            </form>`,
            `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(template);
        }
      );
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      //request에 data가 있을 경우 처리 하는 부분
      body += data;
    });
    request.on("end", function () {
      //data 처리가 다 끝난 경우
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;

      fs.rename(`../data/${id}`, `../data/${title}`, function (error) {
        // fs.writeFile(filename, content, encoding, callback)
        fs.writeFile(`../data/${title}`, description, "utf-8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      //request에 data가 있을 경우 처리 하는 부분
      body += data;
    });
    request.on("end", function () {
      //data 처리가 다 끝난 경우
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`../data/${id}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
