
// 图片懒加载
const imgs = document.getElementsByTagName('img')
    const num = imgs.length
    let n = 0


    function loadImage() {
        console.log('还可以继续往下加载图片');
        // 是否在可视区
        let screenHeight = document.documentElement.clientHeight // 拿到一屏的高度
        let scrollTop = document.documentElement.scrollTop
        || document.body.scrollTop
        for (let i = 0; i < num; i++) {
            if (imgs[i].offsetTop < screenHeight + scrollTop) {
                imgs[i].src = imgs[i].getAttribute('data-src')
                // console.log(imgs[i].dataset.src,imgs[i].dataset.price);
                n = i + 1
                if (n === num) {
                    console.log('所有图片加载完成');
                    // 加载完最后的图片时移除函数
                    window.removeEventListener('scroll',loadImage)
                }
            }
        }

    }

    // window.addEventListener('scroll',loadImage)

    const throttleLayLoad = _.throttle(loadImage,350)
    window.addEventListener('scroll',throttleLayLoad)