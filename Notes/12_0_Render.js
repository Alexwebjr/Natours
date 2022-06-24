/*============ Pug ============
*init in app.js:
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



//?Code
//*Route:
//ROUTES
app.use('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Alex',
  });
});

//*base.pug
doctype html
html
  head 
    title Natours #{tour}
    link(rel='stylesheet' href='css/style.css')
    link(rel='shortcut icon' type='image/png' href='img/favicon.png')

  body
    h1= tour
    h2= user.toUpperCase()
    - const x = 9;
    h2= 2*x
    p This is just some text
    | space


//?Pug block/include
//*Template
  body
    // HEADER
    include _header

    //CONTENT
    block content 
      h1 This is a placeholder heading

    // FOOTER
    include _footer

//*Hijo
extends base.pug

block content
  h1 This is the tour detail page
*/

/*========== MIXING IN PUG ==========
//?Create
mixin overviewBox(label, text, icon)
  .overview-box__detail
    svg.overview-box__icon
      use(xlink:href=`/img/icons.svg#icon-${icon}`)
    span.overview-box__label= label
    span.overview-box__text= text


//?Call
+overviewBox('Next date', date, 'calendar')


//?External
include _reviewCard

_reviewCar: ...
*/

/*================ AXIO ================
let res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
*/

/*================  COOKIE PARSER  ================
 * npm i cookie-parser
 
 *app:
app.use(cookieParser()); //Parser data form cookie

 */

/*================ Parcel ================
 *sudo npm i parcel-bundler@1.12.3 --save-dev

 *pack.js in scripts add:
 "watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js",
 "build:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js"

 */
