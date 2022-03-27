var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var sanitizeHtml = require("sanitize-html");

var template = require("./lib/template");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome!";
        var description = "hello, Node.js";
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2> <p>${description}</p>`,
          `<a href="/create">create</a>`
        );

        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(
          `./data/${filteredId}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowTags: ["h1"],
            });
            var list = template.list(filelist);
            var html = template.HTML(
              sanitizedTitle,
              list,
              `<h2>${sanitizedTitle}</h2> <p>${sanitizedDescription}</p>`,
              `<a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
            );
            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      var title = "WEB - Create";
      var list = template.list(filelist);
      var html = template.HTML(
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
      response.end(html);
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
      fs.writeFile(`./data/${title}`, description, "utf-8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    var filteredId = path.parse(queryData.id).base;
    fs.readdir("./data", function (error, filelist) {
      fs.readFile(`./data/${filteredId}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
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
        response.end(html);
      });
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

      fs.rename(`./data/${id}`, `./data/${title}`, function (error) {
        // fs.writeFile(filename, content, encoding, callback)
        fs.writeFile(`./data/${title}`, description, "utf-8", function (err) {
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
      var filteredId = path.parse(id).base;
      fs.unlink(`./data/${filteredId}`, function (error) {
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
