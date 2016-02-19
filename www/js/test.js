document.querySelector('.sidebar-open').addEventListener('click', function () {
    document.querySelector('#sidebar').setAttribute('active', 'on');
}, false);

document.querySelector('.sidebar-close').addEventListener('click', function () {
    document.querySelector('#sidebar').setAttribute('active', 'off');
    document.querySelector('#container').classList.remove('test');
}, false);

document.querySelector('.view-open').addEventListener('click', function () {
    document.querySelector('#view').setAttribute('active', 'on');
}, false);

document.querySelector('.sidebar-open').addEventListener('click', function () {
    document.querySelector('#container').classList.add('test');
}, false);


document.querySelector('.nav-back').addEventListener('click', function () {
    document.querySelector('#view').setAttribute('active', 'off');
}, false);
