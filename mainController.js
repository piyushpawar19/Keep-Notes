
exports.homepage = async (req, res, next) => {
    const locals ={
    title: 'NodeJs Notes',
    description : 'Free NodeJS Notes Application'
    }
    res.render('index',{
        locals,
        layout: '../views/layouts/front-page'
    });
};

exports.about = async (req, res, next) => {
    const locals ={
    title: 'About - NodeJs Notes',
    description : 'Free NodeJS Notes Application'
    }
    res.render('about',locals);
};