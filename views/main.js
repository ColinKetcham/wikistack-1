const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) =>
  layout(html` <h3 style="margin-top:50px">Pages</h3>
    <hr />
    <form method="GET" action="/wiki/search">
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
    <hr />
    <ul class="list-unstyled">
      <ul>
        ${pages.map(
          (page) =>
            html`<li>
              <a href="localhost:3000/wiki/${page.slug}"> ${page.title}</a>
            </li>`
        )}
      </ul>
    </ul>`);
