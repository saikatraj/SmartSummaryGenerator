function JsSummarize(options)
{
    'use strict';

    /** @type {Number} This is the ideal sentence length and will give weight to 
    sentences that are close to this length */
    this._idealSentenceLength = 15.0;
    /** @type {Array} This is an array of tokens to exlude when generating sentence value */
    this._excludeList = ["-", " ", ",", ".", "a", "e", "i", "o", "u", "t", "about",
                         "above", "above", "across", "after", "afterwards", "again", "against", "all",
                         "almost", "alone", "along", "already", "also", "although", "always", "am", "among",
                         "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", 
                         "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", 
                         "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", 
                         "being", "below", "beside", "besides", "between", "beyond", "both", "bottom", "but", 
                         "by", "call", "can", "cannot", "can't", "co", "con", "could", "couldn't", "de", 
                         "describe", "detail", "did", "do", "done", "down", "due", "during", "each", "eg", 
                         "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", 
                         "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", 
                         "fifty", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", 
                         "found", "four", "from", "front", "full", "further", "get", "give", "go", "got", "had", 
                         "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", 
                         "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", 
                         "ie", "if", "in", "inc", "indeed", "into", "is", "it", "its", "it's", "itself", "just", "keep", 
                         "last", "latter", "latterly", "least", "less", "like", "ltd", "made", "make", "many", "may", "me", 
                         "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", 
                         "my", "myself", "name", "namely", "neither", "never", "nevertheless", "new", "next", "nine", "no", 
                         "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", 
                         "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", 
                         "out", "over", "own", "part", "people", "per", "perhaps", "please", "put", "rather", "re", "said", 
                         "same", "see", "seem", "seemed", "seeming", "seems", "several", "she", "should", "show", "side", 
                         "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", 
                         "sometimes", "somewhere", "still", "such", "take", "ten", "than", "that", "the", "their", "them", 
                         "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", 
                         "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", 
                         "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", 
                         "under", "until", "up", "upon", "us", "use", "very", "via", "want", "was", "we", "well", "were", "what", 
                         "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", 
                         "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", 
                         "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", 
                         "yourselves", "the", "reuters", "news", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", 
                         "sunday", "mon", "tue", "wed", "thu", "fri", "sat", "sun", "rappler", "rapplercom", "inquirer", "yahoo", 
                         "home", "sports", "1", "10", "2012", "sa", "says", "tweet", "pm", "home", "homepage", "sports", "section", 
                         "newsinfo", "stories", "story", "photo", "2013", "na", "ng", "ang", "year", "years", "percent", "ko", "ako", 
                         "yung", "yun", "2", "3", "4", "5", "6", "7", "8", "9", "0", "time", "january", "february", "march", "april", 
                         "may", "june", "july", "august", "september", "october", "november", "december", "government", 
                         "police","0o", "0s", "3a", "3b", "3d", "6b", "6o", "a", "a1", "a2", "a3", "a4", "ab", "able", "about", 
                         "above", "abst", "ac", "accordance", "according", "accordingly", "across", "act", "actually", "ad", "added", 
                         "adj", "ae", "af", "affected", "affecting", "affects", "after", "afterwards", "ag", "again", "against", "ah", 
                         "ain", "ain't", "aj", "al", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", 
                         "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "announce", "another", "any", "anybody", "anyhow", 
                         "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "ao", "ap", "apart", "apparently", "appear", "appreciate", "appropriate", 
                         "approximately", "ar", "are", "aren", "arent", "aren't", "arise", "around", "as", "a's", "aside", "ask", "asking", "associated", "at", "au", 
                         "auth", "av", "available", "aw", "away", "awfully", "ax", "ay", "az", "b", "b1", "b2", "b3", "ba", "back", "bc", "bd", "be", "became", 
                         "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", 
                         "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "bi", "bill", "biol", "bj", "bk", "bl", "bn", 
                         "both", "bottom", "bp", "br", "brief", "briefly", "bs", "bt", "bu", "but", "bx", "by", "c", "c1", "c2", "c3", "ca", "call", "came", "can", "cannot", 
                         "cant", "can't", "cause", "causes", "cc", "cd", "ce", "certain", "certainly", "cf", "cg", "ch", "changes", "ci", "cit", "cj", "cl", "clearly", "cm", 
                         "c'mon", "cn", "co", "com", "come", "comes", "con", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", 
                         "could", "couldn", "couldnt", "couldn't", "course", "cp", "cq", "cr", "cry", "cs", "c's", "ct", "cu", "currently", "cv", "cx", "cy", "cz", "d", "d2", "da", "date", 
                         "dc", "dd", "de", "definitely", "describe", "described", "despite", "detail", "df", "di", "did", "didn", "didn't", "different", "dj", "dk", "dl", "do", "does", 
                         "doesn", "doesn't", "doing", "don", "done", "don't", "down", "downwards", "dp", "dr", "ds", "dt", "du", "due", "during", "dx", "dy", 
                         "e", "e2", "e3", "ea", "each", "ec", "ed", "edu", "ee", "ef", "effect", "eg", "ei", "eight", "eighty", "either", "ej", "el", "eleven", 
                         "else", "elsewhere", "em", "empty", "en", "end", "ending", "enough", "entirely", "eo", "ep", "eq", "er", "es", "especially", "est", "et", 
                         "et-al", "etc", "eu", "ev", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", 
                         "except", "ey", "f", "f2", "fa", "far", "fc", "few", "ff", "fi", "fifteen", "fifth", "fify", "fill", "find", "fire", "first", 
                         "five", "fix", "fj", "fl", "fn", "fo", "followed", "following", "follows", "for", "former", "formerly", "forth", "forty", "found", 
                         "four", "fr", "from", "front", "fs", "ft", "fu", "full", "further", "furthermore", "fy", "g", "ga", "gave", "ge", "get", "gets", "getting", 
                         "gi", "give", "given", "gives", "giving", "gj", "gl", "go", "goes", "going", "gone", "got", "gotten", "gr", "greetings", "gs", 
                         "gy", "h", "h2", "h3", "had", "hadn", "hadn't", "happens", "hardly", "has", "hasn", "hasnt", "hasn't", "have", "haven", "haven't", 
                         "having", "he", "hed", "he'd", "he'll", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "here's", "hereupon", 
                         "hers", "herself", "hes", "he's", "hh", "hi", "hid", "him", "himself", "his", "hither", "hj", "ho", "home", "hopefully", "how", "howbeit", "however", "how's", 
                         "hr", "hs", "http", "hu", "hundred", "hy", "i", "i2", "i3", "i4", "i6", "i7", "i8", "ia", "ib", "ibid", "ic", "id", "i'd", "ie", "if", "ig", "ignored", "ih", 
                         "ii", "ij", "il", "i'll", "im", "i'm", "immediate", "immediately", "importance", "important", "in", "inasmuch", "inc", "indeed", "index", "indicate", 
                         "indicated", "indicates", "information", "inner", "insofar", "instead", "interest", "into", "invention", "inward", "io", "ip", "iq", "ir", "is", "isn", 
                         "isn't", "it", "itd", "it'd", "it'll", "its", "it's", "itself", "iv", "i've", "ix", "iy", "iz", "j", "jj", "jr", "js", "jt", "ju", "just", "k", "ke", 
                         "keep", "keeps", "kept", "kg", "kj", "km", "know", "known", "knows", "ko", "l", "l2", "la", "largely", "last", "lately", "later", "latter", "latterly", 
                         "lb", "lc", "le", "least", "les", "less", "lest", "let", "lets", "let's", "lf", "like", "liked", "likely", "line", "little", "lj", "ll", "ll", "ln", "lo", "look", 
                         "looking", "looks", "los", "lr", "ls", "lt", "ltd", "m", "m2", "ma", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", 
                         "meanwhile", "merely", "mg", "might", "mightn", "mightn't", "mill", "million", "mine", "miss", "ml", "mn", "mo", "more", "moreover", "most", "mostly", "move", "mr", "mrs", 
                         "ms", "mt", "mu", "much", "mug", "must", "mustn", "mustn't", "my", "myself", "n", "n2", "na", "name", "namely", "nay", "nc", "nd", "ne", "near", "nearly", "necessarily", 
                         "necessary", "need", "needn", "needn't", "needs", "neither", "never", "nevertheless", "new", "next", "ng", "ni", "nine", "ninety", "nj", "nl", "nn", "no", "nobody", "non", "none", 
                         "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "novel", "now", "nowhere", "nr", "ns", "nt", "ny", "o", "oa", "ob", "obtain", "obtained", "obviously", 
                         "oc", "od", "of", "off", "often", "og", "oh", "oi", "oj", "ok", "okay", "ol", "old", "om", "omitted", "on", "once", "one", "ones", "only", "onto", "oo", "op", "oq", "or", 
                         "ord", "os", "ot", "other", "others", "otherwise", "ou", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "ow", "owing", "own", "ox", "oz", "p", 
                         "p1", "p2", "p3", "page", "pagecount", "pages", "par", "part", "particular", "particularly", "pas", "past", "pc", "pd", "pe", "per", "perhaps", "pf", "ph", "pi", 
                         "pj", "pk", "pl", "placed", "please", "plus", "pm", "pn", "po", "poorly", "possible", "possibly", "potentially", "pp", "pq", "pr", "predominantly", "present", 
                         "presumably", "previously", "primarily", "probably", "promptly", "proud", "provides", "ps", "pt", "pu", "put", "py", "q", "qj", "qu", "que", "quickly", 
                         "quite", "qv", "r", "r2", "ra", "ran", "rather", "rc", "rd", "re", "readily", "really", "reasonably", "recent", "recently", "ref", "refs", "regarding", "regardless", 
                         "regards", "related", "relatively", "research", "research-articl", "respectively", "resulted", "resulting", "results", "rf", "rh", "ri", "right", "rj", "rl", 
                         "rm", "rn", "ro", "rq", "rr", "rs", "rt", "ru", "run", "rv", "ry", "s", "s2", "sa", "said", "same", "saw", "say", "saying", "says", "sc", "sd", "se", "sec", 
                         "second", "secondly", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", 
                         "several", "sf", "shall", "shan", "shan't", "she", "shed", "she'd", "she'll", "shes", "she's", "should", "shouldn", "shouldn't", "should've", "show", "showed", "shown", 
                         "showns", "shows", "si", "side", "significant", "significantly", "similar", "similarly", "since", "sincere", "six", "sixty", "sj", "sl", "slightly", "sm", "sn", "so", "some", 
                         "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "sp", "specifically", "specified", "specify", 
                         "specifying", "sq", "sr", "ss", "st", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "sy", "system", 
                         "sz", "t", "t1", "t2", "t3", "take", "taken", "taking", "tb", "tc", "td", "te", "tell", "ten", "tends", "tf", "th", "than", "thank", "thanks", "thanx", "that", "that'll", 
                         "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", 
                         "therere", "theres", "there's", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'd", "they'll", "theyre", "they're", "they've", "thickv", "thin", "think", 
                         "third", "this", "thorough", "thoroughly", "those", "thou", "though", "thoughh", "thousand", "three", "throug", "through", "throughout", "thru", "thus", "ti", "til", 
                         "tip", "tj", "tl", "tm", "tn", "to", "together", "too", "took", "top", "toward", "towards", "tp", "tq", "tr", "tried", "tries", "truly", "try", "trying", "ts", 
                         "t's", "tt", "tv", "twelve", "twenty", "twice", "two", "tx", "u", "u201d", "ue", "ui", "uj", "uk", "um", "un", "under", "unfortunately", "unless", "unlike", 
                         "unlikely", "until", "unto", "uo", "up", "upon", "ups", "ur", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "ut", "v", "va", "value", 
                         "various", "vd", "ve", "ve", "very", "via", "viz", "vj", "vo", "vol", "vols", "volumtype", "vq", "vs", "vt", "vu", "w", "wa", "want", "wants", "was", "wasn", "wasnt",
                         "wasn't", "way", "we", "wed", "we'd", "welcome", "well", "we'll", "well-b", "went", "were", "we're", "weren", "werent", "weren't", "we've", "what", "whatever", "what'll", 
                         "whats", "what's", "when", "whence", "whenever", "when's", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "where's", "whereupon", "wherever", "whether", "which", 
                         "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "who's", "whose", "why", "why's", "wi", "widely", "will", "willing", "wish", 
                         "with", "within", "without", "wo", "won", "wonder", "wont", "won't", "words", "world", "would", "wouldn", "wouldnt", "wouldn't", "www", "x", "x1", "x2", "x3", "xf", "xi", "xj", "xk", "xl", 
                         "xn", "xo", "xs", "xt", "xv", "xx", "y", "y2", "yes", "yet", "yj", "yl", "you", "youd", "you'd", "you'll", "your", "youre", "you're", "yours", "yourself", "yourselves", "you've", 
                         "yr", "ys", "yt", "z", "zero", "zi", "zz", "e.g", "i.e", "e.g.", "i.e."];
    /**
     * This tokenizer is used to tokenize text into words or sentences
     * @type {Tokenizer}
     */
    this._tokenizer = new Tokenizer();

    /** @type {Number} The number of summary sentences to return */
    this._returnCount = 5;

    /** @type {Array} Sentence position value array. Used to score sentence position in text */
    this._positionValueArray = [
        {low:0, high:0.1, score:0.17},
        {low:0.1, high:0.2, score:0.23},
        {low:0.2, high:0.3, score:0.14},
        {low:0.3, high:0.4, score:0.08},
        {low:0.4, high:0.5, score:0.05},
        {low:0.5, high:0.6, score:0.04},
        {low:0.6, high:0.7, score:0.06},
        {low:0.7, high:0.8, score:0.04},
        {low:0.8, high:0.9, score:0.04},
        {low:0.9, high:1.0, score:0.15}
    ];

    if(!options) return;

    this._idealSentenceLength = options.idealSentenceLength || this._idealSentenceLength;
    this._returnCount = options.returnCount || this._returnCount;
    this._excludeList = options.excludeList || this._excludeList;
    this._positionValueArray = options.positionValueArray || this._positionValueArray;
}

/**
 * Main function. Will take in the correct text and return an array of sentences
 * in order of importance.
 * 
 * @param  {string} title The title of the text
 * @param  {string} text The long text
 * @param  {object} options The options object used to override parameters
 * @return {array} an array of sentences that summarize the text
 */
JsSummarize.prototype.summarize = function (title, text) {

    if (text.length == 0) return [];

    var sentences = this.splitSentences(text);
    var keywords = this.keywords(text);
    var titleWords = this.splitWords(title)
    var scoredSentences = this.score(sentences, titleWords, keywords);

    //Sort by score, select just the sentences, and return 5 (or whatever is set in options)
    var orderedList = _.chain(scoredSentences)
                        .sortBy("score")
                        .reverse()
                        .pluck("sentence")
                        .take(this._returnCount)
                        .value();

    return orderedList;
},

/**
 * Handles the bulk of the operations. This will score sentences based on
 * shared keywords in the title, amount of high frequencey keywords, ideal length,
 * ideal position, sbs sentence algorithm,and the dbs sentence algorithm;
 * 
 * @param  {array} sentences  The array of sentences that make up the large text
 * @param  {array} titleWords The array of word tokens that make up the text title
 * @param  {array} keywords   The array of high frequency keywords in the text
 * @return {array}            The array of computed summary sentences.
 */
JsSummarize.prototype.score = function (sentences, titleWords, keywords) {

    var scoredSentences = [];

    for(var i = 0; i < sentences.length; i++)
    {
        //Split the sentence into words
        var sentenceWords = this.splitWords(sentences[i]);
        //Score based on shared title words
        var titleFeature = this.titleScore(titleWords, sentenceWords);
        //Score based on sentence length
        var sentenceLength = this.lengthScore(sentenceWords);
        //Score based on sentence position
        var sentencePosition = this.sentencePosition(i+1, sentences.length);
        //Score based on SBS
        var sbsFeature = this.sbs(sentenceWords, keywords); //Summation-based selection scoring
        //Score based on DBS
        var dbsFeature = this.dbs(sentenceWords, keywords); //Density-based selection scoring
        //Calculate frequency
        var frequency = (sbsFeature + dbsFeature) / 2.0 * 10.0; 

        //Weighted average of scores from four categores
        var totalScore = (titleFeature*1.5 + frequency*2.0 + sentenceLength*1.0 + sentencePosition*1.0)/4.0;

        scoredSentences.push({sentence:sentences[i],score:totalScore});
    }

    return scoredSentences;
},

/**
 * Summation-based selection scoring
 * @param  {array} words    sentence to score
 * @param  {array} keywords list of keywords to score against
 * @return {number}          score
 */
JsSummarize.prototype.sbs = function (words, keywords) {
    if(words.length == 0) return 0;

    var score = 0;
    var contribution = 10;

    for(var i = 0; i < words.length; i++)
    {
        var word = words[i];
        var match = _.find(keywords,{"word":word});
        if(match)
        {
            score += match.score;
        }
    }

    return (1.0 / words.length) * (score/contribution);
},

/**
 * Density-based selection scoring
 * @param  {array} words    sentence to score
 * @param  {array} keywords list of keywords to score against
 * @return {number}          score
 */
JsSummarize.prototype.dbs = function (words, keywords) {
    if(words.length == 0) return 0;
    
    var total = 0;
    var first = null;
    var second = null;
    var keywordsFound = 0;

    for(var i = 0; i < words.length; i++)
    {
        var word = words[i];
        var match = _.find(keywords,{"word":word});
        if(match)
        {
            keywordsFound++;
            var score = match.score;
            if(!first)
            {
                first = {index:i, score:score};
            }
            else{
                second = first;
                first = {index:i, score:score};
                var dif = first.index - second.index;
                total += (first.score*second.score) / (Math.pow(dif,2));
            }
        }
    }

    if(keywordsFound == 0) return 0;
    return (1/(keywordsFound*(keywordsFound+1)))*total;
},

/**
 * Uses tokenizer to split text into word tokens
 * @param  {string} text text to split into tokens
 * @return {array}      An array of words
 */
JsSummarize.prototype.splitWords = function (text) {
    return this._tokenizer.tokenizeAggressive(text.toLowerCase());
},

/**
 * Builds up a list of high frequency words (keywords) used throughout
 * the text. Uses the exclusion list to remove words that do not help the
 * sentence score.
 * 
 * @param  {string} text Full text to parse
 * @return {array}      An array of high frequency keywords
 */
JsSummarize.prototype.keywords = function (text) {

    var splitText = this.splitWords(text);

    var words = _.chain(splitText)
                .difference(this._excludeList)
                .groupBy(function (word) {return word;})
                .map(function(group){
                    var frequency = group.length;
                    var score = (frequency * 1.0 / splitText.length) * 1.5 + 1;
                    return {word:group[0], score:score};
                }).sortBy('score')
                .reverse()
                .take(10)
                .value();

    return words;
},

/**
 * Uses tokenizer to split text into sentences
 *     
 * @param  {string} text Full text to split into sentences
 * @return {array}      The array of sentences
 */ 
JsSummarize.prototype.splitSentences = function (text) {
    return this._tokenizer.getSentences(text);
},

/**
 * Scores a sentence based on the ideal length
 * @param  {array} sentence Sentence word array to score
 * @return {number}          Score based on sentence length
 */
JsSummarize.prototype.lengthScore = function (sentence) {

    return 1 - Math.abs(this._idealSentenceLength - sentence.length) / this._idealSentenceLength;
},

/**
 * Scores a sentence based on shared words with the title
 * 
 * @param  {string} title    Text Title
 * @param  {array} sentence Sentence word array to score
 * @return {number}          Score based on title
 */
JsSummarize.prototype.titleScore = function (title, sentence) {

    if(!title || !sentence) return 0;
    //Remove any words shared with the exclusion list
    var titleWords = _.difference(title, this._excludeList);
    var count = 0;
    for(var i = 0; i < sentence.length; i++)
    {
        var word = sentence[i];
        if(!_.contains(this._excludeList, word) && _.contains(titleWords, word ))
        {
            count++;
        }
    }

    return count === 0? 0 : count/title.length;
},

/**
 * Scores a sentence based on its location in the text. Different sentence
 * positions indicate different probabilities of being an important sentence.
 * 
 * index ->   Sentence index in array of text sentences
 * numberOfSentences -> The total number of sentences in the text
 * Lastly, returns Scored based on sentence position: ;
 */
JsSummarize.prototype.sentencePosition = function (index, numberOfSentences) {

    var normalized =  index/numberOfSentences;

    for(var i = 0; i < this._positionValueArray.length; i++)
    {
        var position = this._positionValueArray[i];
        if(normalized > position.low && normalized <= position.high) return position.score;
    }

    return 0;
} 

