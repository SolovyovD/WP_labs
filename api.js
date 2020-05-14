const express = require('express');
const router = express.Router();

const colors = ['#FF0000', '#00FF00', '#FF8000']
const sizes = ['400x600', '800x600', '1280x960']

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', (req, res) => {
    res.send('<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/getPicture" method="post">' +
        '<select name="colorSelector">' +
        '<option hidden>Выберите цвет</option>' +
        '<option>Красный</option>' +
        '<option>Зеленый</option>' +
        '<option>Оранжевый</option>' +
        '</select>' +
        '<select name="sizeSelector">' +
        '<option hidden>Выберите размер</option>' +
        '<option>400х600</option>' +
        '<option>800х600</option>' +
        '<option>1280х960</option>' +
        '</select>' +
        '<input pattern="[a-zA-Z]{1,8}\\s?\\d?" name="text" required>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>');
})

router.post('/test', (req, res) => {
    res.send({ kek: 'that works' });
})

router.post('/getPicture', (req, res) => {
    let splitSizes;
    if (req.body.sizeSelector == 'Выберите размер') {
        splitSizes = sizes[getRandomInt(0, 2)].split('x');
    }
    else {
        splitSizes = req.body.sizeSelector.split('х');
    }
    let params = {
        name: req.body.text.trim().split(' '),
        color: req.body.colorSelector,
        size: {
            width: splitSizes[0],
            height: splitSizes[1],
        },
        image: 'default',
    }
    if (params.name[0] != 'kaban' &
        params.name[0] != 'kalmar' &
        params.name[0] != 'kakadu') {
        res.send({ name: 'not found' });
        return;
    }
    if (typeof params.name[1] === 'undefined') {
        params.name[1] = getRandomInt(0, 9);
    }
    if (params.color == 'Выберите цвет') {
        params.color = colors[getRandomInt(0, 2)];
    }
    params.image = 'images/' + params.name[0] + '/' + params.name[0] + '_' + params.name[1] + '.jpg';
    res.send(params);
})

router.get('/picture/:name/:id/:color/:size', (req, res) => {
    let splitSizes;
    if (req.params.size == '400x600' || '800x600' || '1280x960') {
        splitSizes = req.params.size.split('х');
    }
    else { splitSizes = sizes[getRandomInt(0, 2)].split('x'); }
    let imageParams = {
        name: req.params.name,
        color: req.params.color,
        size: {
            width: splitSizes[0],
            height: splitSizes[1],
        },
        id: req.params.id
    }
    if (Number.isInteger(imageParams.id) || Number(imageParams.id) > 9) {
        imageParams.id = getRandomInt(0, 9);
    }
    if (imageParams.name != 'kaban' &&
        imageParams.name != 'kalmar' &&
        imageParams.name != 'kakadu') {
        res.send('not found');
        return;
    }
    if (imageParams.color != 'red' &&
        imageParams.color != 'green' &&
        imageParams.color != 'orange') {
        imageParams.color = colors[getRandomInt(0, 2)];
    }
    res.send({
        page:
            '<div style="background: ' + imageParams.color + ';">' +
            '<image width="' + imageParams.size.width +
            ' height="' + imageParams.size.height +
            '" src="http://localhost:8888/' + imageParams.name + '/' + imageParams.name + '_' + imageParams.id + '.jpg">' +
            '</div>'
    });
})

module.exports = router;