/*global ace*/

ace.define("ace/mode/michelson_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var MichelsonHighlightRules = function() {

    this.$rules = {
        "start" : [ {
            token : "comment.line",
            regex : "#.*$"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "constant.numeric",
            regex : "-?[1-9][0-9]*"
        }, {
            token : "keyword",
            regex : "parameter|return|storage|code"
        }, {
            token : "constant.language",
            regex : "Unit|True|False"
        }, {
            token: "storage.type",
            regex: "string|nat|int|bool|unit|list|pair|option|or|set|map|tez|timestamp|contract|key|signature"
        }, {
            token: "support.function",
            regex: "Pair|Left|Right|Some|None|List|Set|Map|DROP|SWAP|PUSH|SOME|NONE|UNIT|IF_NONE|LEFT|RIGHT|IF_LEFT|NIL|CONS|IF_CONS|EMPTY_SET|EMPTY_MAP|MAP|REDUCE|MEM|GET|UPDATE|IF|LOOP|LAMBDA|EXEC|DIP|FAIL|CONCAT|ADD|SUB|MUL|DIV|ABS|NEG|MOD|LSL|LSR|OR|AND|XOR|NOT|COMPARE|MANAGER|SELF|TRANSFER_TOKENS|CREATE_ACCOUNT|CREATE_CONTRACT|NOW|AMOUNT|BALANCE|CHECK_SIGNATURE|H|STEPS_TO_QUOTA|SOURCE"
        }, {
            token: "support.function",
            regex: "DU+P|DI+P|C(A|D)+R|PA+IR"
        }, {
            token: "support.function",
            regex: "(CMP|IF|IFCMP)?(EQ|NEQ|LT|GT|LE|GE)"
        }, {
            token : "identifier",
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(MichelsonHighlightRules, TextHighlightRules);

exports.MichelsonHighlightRules = MichelsonHighlightRules;
});

ace.define("ace/mode/michelson",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/michelson_highlight_rules"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var MichelsonHighlightRules = acequire("./michelson_highlight_rules").MichelsonHighlightRules;

var Mode = function() {
    this.HighlightRules = MichelsonHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";

    this.$id = "ace/mode/michelson";
}).call(Mode.prototype);

exports.Mode = Mode;

});