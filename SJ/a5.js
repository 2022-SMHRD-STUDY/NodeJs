// function templateHTML(title, list, body, control){
//     return `
//     <!doctype html>
//     <html>
//     <head>
//       <title>WEB1 - ${title}</title>
//       <meta charset="utf-8">
//     </head>
//     <body>
//       <h1><a href="/">WEB</a></h1>
//       ${list}
//       ${control}
//       ${body}
//     </body>
//     </html>
//     `;
//   }
//   function templateList(filelist){
//     var list = '<ul>';
//     var i = 0;
//     while(i < filelist.length){
//       list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
//       i = i + 1;

// -> 객체에 담아서 정리 ->>
// templateList, templateHTML -> template.list, template.HTML로 수정하면 끝