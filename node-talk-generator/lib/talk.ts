import sentence = require('./sentence');
import pointer = require('./pointer');

/**
 * 会話を表すクラス
 */
export class Talk {
    public constructor(
        public id: string,
        public entryPoint: boolean = false
        ) { }

    /**
     * 文章を追加する
     */
    public add(sentence: sentence.Sentence): Talk {
        
        return this;
    }

    public getPointer(): pointer.Pointer {
        return null;
    }
}

