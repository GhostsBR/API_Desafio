exports.pageNotFound = (req, res, next) => {
    res.status = 404;
    res.render('error', {errorType: 'error 404', title: 'Página não encontrada!', description: 'A página que você está procurando não foi encontrada!', img: { url: 'img/robot.png', alt: 'robo', height: '200'}});
}