enchant();

window.onload=function(){
    const game = new Game(400,500);

    //画像ファイル等の読み込み

    //クリック音
    const clickSndUrl = "click.wav";
    game.preload([clickSndUrl]);

    //キャラ１画像
    const charImg1Url = "inko.png";
    game.preload([charImg1Url]);

    //背景雲画像
    const cloudImgUrl = "cloud.png";
    game.preload([cloudImgUrl]);

    //リトライボタン
	const retryImgUrl = "retry.png";
	game.preload([retryImgUrl]);

	//ツイートボタン
	const tweetImgUrl = "tweet.png";
	game.preload([tweetImgUrl]);


    game.onload=function(){

        let point = 0;
        let state = 0;

        const mainScene = new Scene();
        game.pushScene(mainScene);
        mainScene.backgroundColor = '#a0d8ef';

        const scoreText = new Label();
        scoreText.font = "20px Meiryo";
        scoreText.color = 'rgba(255,255,255,1)';
        scoreText.width = 400;
        scoreText.moveTo(0,30);
        mainScene.addChild(scoreText);

        scoreText.text = "現在：" + point;

        //背景
        const cloudImg = new Sprite(100,50);
        cloudImg.moveTo(50,70);
        cloudImg.image = game.assets[cloudImgUrl];
        mainScene.addChild(cloudImg);

        const cloudImg2 = new Sprite(100,50);
        cloudImg2.moveTo(250,130);
        cloudImg2.image = game.assets[cloudImgUrl];
        mainScene.addChild(cloudImg2);

        //inkoボタン
        const　inkoImg = new Sprite(100,100);
        inkoImg.moveTo(118,100);
        inkoImg.image = game.assets[charImg1Url];
        mainScene.addChild(inkoImg);

        inkoImg.ontouchend = function(){
            point++;
            game.assets[clickSndUrl].clone().play();

            this.x = -200;

            if(point < 3){
                state = 1;
            }else if(point < 6){
                state = 2;
            }else if(point < 9){
                state = 3;
            }else if(point < 12){
                state = 4;
            }else{
                state = 5;
            }
        };


        game.onenterframe = function(){
            if(state == 0){
                inkoImg.x = -200;
                inkoImg.y = 100;
                point = 0;
                state = 1;
            }
            if(state == 1){
                inkoImg.x += 5;
            }
            if(state == 2){
                inkoImg.x += 15;
            }
            if(state == 3){
                inkoImg.x += 10;
                inkoImg.y = 200 + Math.sin(inkoImg.x/70)*100;
            }
            if(state == 4){
                inkoImg.y = Math.random()*400;
                state = 4.1;
            }
            if(state == 4.1){
                inkoImg.x += 10;
            }
            if(state == 5){
                inkoImg.x += 10;
                inkoImg.y = Math.random()*400;
            }

            scoreText.text = "現在:" + point;

            if(inkoImg.x >= 400){
                game.popScene();
                game.pushScene(endScene);

                gameOverText.text = "GAMEOVER 記録：" + point + "羽";
            }
        };

        const endScene = new Scene();
        endScene.backgroundColor = "blue";

        const gameOverText = new Label();
        gameOverText.font = "20px Meiryo";
        gameOverText.color = 'rgba(255,255,255,1)';
        gameOverText.width = 400;
        gameOverText.moveTo(0,30);
        endScene.addChild(gameOverText);

        const retryBtn = new Sprite(120,60);
        retryBtn.moveTo(50,300);
        retryBtn.image = game.assets[retryImgUrl];
        endScene.addChild(retryBtn);

        retryBtn.ontouchend = function(){
            state = 0;
            game.popScene();
            game.pushScene(mainScene);
        };

        const tweetBtn = new Sprite(120,60);
        tweetBtn.moveTo(230,300);
        tweetBtn.image = game.assets[tweetImgUrl];
        endScene.addChild(tweetBtn);

        tweetBtn.ontouchend = function(){
            const url = encodeURI("http://pippi1218.starfree.jp/");
			window.open("http://twitter.com/intent/tweet?text=" + point + "羽捕まえたよ！&hashtags=toricatch&url=" + url);
        };
    };

    game.start();//開始！
};