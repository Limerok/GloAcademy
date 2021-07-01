const photoTeam = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((event) => {
        event.addEventListener('mouseenter', event => {
            const srcImg = event.target.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = srcImg;
        });
    });
    commandPhoto.forEach((event) => {
        event.addEventListener('mouseleave', event => {
            const srcImg = event.target.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = srcImg;
        });
    });
};

export default  photoTeam;