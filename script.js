enchant();

window.onload=function(){
    const game = new Game(400,500);

    //画像ファイル等の読み込み

    //クリック音
    const clickSnd = "click.wav";
    game.preload([clickSnd]);

    //キャラ１画像
    const charImg1 = "inko.png";
    game.preload([charImg1]);

    //リトライボタン
	const retryImgUrl = "retry.png";
	game.preload([retryImg]);

	//ツイートボタン
	const tweetImgUrl = "tweet.png";
	game.preload([tweetImg]);


    game.onload=function(){

        let point = 0;
        let state = 0;

        const mainScene = new Scene();
        game.pushScene(mainScene);
        mainScene.backgroundColor = '#a9ceec'

    };

    game.start();//開始！
};