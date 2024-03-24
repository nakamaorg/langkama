(function(o,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(o=typeof globalThis<"u"?globalThis:o||self,i(o.Langkama={}))})(this,function(o){"use strict";var pe=Object.defineProperty;var Ee=(o,i,n)=>i in o?pe(o,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[i]=n;var g=(o,i,n)=>(Ee(o,typeof i!="symbol"?i+"":i,n),n);var i=(r=>(r.Dot=".",r.Comma=",",r.OpenPren="(",r.ClosePren=")",r.OpenBrace="{",r.OpenBrack="[",r.CloseBrace="}",r.CloseBrack="]",r.DoubleQuotes='"',r.Pipe="|",r.Less="<",r.Plus="+",r.Star="*",r.Minus="-",r.Slash="/",r.Equals="=",r.Greater=">",r.Ampersand="&",r.Percentage="%",r.Exclamation="!",r.Space=" ",r.NewLine=`
`,r.Tabulation="	",r.CarriageReturn="\r",r))(i||{}),n=(r=>(r[r.If=0]="If",r[r.EOF=1]="EOF",r[r.Let=2]="Let",r[r.Else=3]="Else",r[r.Const=4]="Const",r[r.While=5]="While",r[r.Comma=6]="Comma",r[r.String=7]="String",r[r.Equals=8]="Equals",r[r.ElseIf=9]="ElseIf",r[r.Return=10]="Return",r[r.Number=11]="Number",r[r.LoneOp=12]="LoneOp",r[r.Comment=13]="Comment",r[r.Function=14]="Function",r[r.BinaryOp=15]="BinaryOp",r[r.OpenParen=16]="OpenParen",r[r.OpenBrace=17]="OpenBrace",r[r.OpenBrack=18]="OpenBrack",r[r.CloseBrack=19]="CloseBrack",r[r.CloseBrace=20]="CloseBrace",r[r.CloseParen=21]="CloseParen",r[r.Identifier=22]="Identifier",r[r.StatementEnd=23]="StatementEnd",r))(n||{});const O={is:n.Equals,jk:n.ElseIf,sike:n.Else,bs:n.Comment,reda:n.Return,"big if true":n.If,"hear me out":n.Let,"cook until":n.While,"let me cook":n.Function,"a sa7 hear me out":n.Const};class b{static isSkippable(e){return[i.Space,i.Tabulation,i.NewLine,i.CarriageReturn].includes(e)}static isNumber(e){const t=e.charCodeAt(0),s=[48,57];return t>=s[0]&&t<=s[1]}static isAlpha(e){return e.toLowerCase()!==e.toUpperCase()}}class k{constructor(e,t){g(this,"context");g(this,"errors");g(this,"onError");this.init(t),this.onError=e}setCallback(e){this.onError=e}getErrors(){return this.errors}hasErrors(){return this.errors.length>0}raise(e){e.setContext(this.context),this.errors.push(e),this.onError(e)}init(e){this.errors=[],e&&(this.context=e)}}class F{constructor(e,t,s){g(this,"errorManager");g(this,"content");g(this,"index");g(this,"line");g(this,"lineOffset");g(this,"compareFn");this.initBase(e),this.errorManager=new k(t),this.compareFn=s??((a,c)=>a&&a==c)}get location(){return{row:this.line,col:this.index-this.lineOffset}}initBase(e){this.line=0,this.index=0,this.lineOffset=0,this.content=e}at(){return this.content[this.index]}eat(){return this.content[this.index++]??null}expect(e,t){const s=this.eat();return this.compareFn(e,s)||this.errorManager.raise(t),s}jumpLine(){this.line++,this.lineOffset=this.index+1}}var m=(r=>(r[r.Skip=0]="Skip",r[r.Null=1]="Null",r[r.Array=2]="Array",r[r.Number=3]="Number",r[r.String=4]="String",r[r.Boolean=5]="Boolean",r[r.Function=6]="Function",r[r.NativeFunction=7]="NativeFunction",r))(m||{}),d=(r=>(r[r.LangKamaError=0]="LangKamaError",r[r.MissingDotError=1]="MissingDotError",r[r.InvalidKeyError=2]="InvalidKeyError",r[r.ExpectedKeyError=3]="ExpectedKeyError",r[r.InvalidFileError=4]="InvalidFileError",r[r.UnknownFileError=5]="UnknownFileError",r[r.MissingColonError=6]="MissingColonError",r[r.InvalidArrayError=7]="InvalidArrayError",r[r.InvalidStringError=8]="InvalidStringError",r[r.MissingEqualsError=9]="MissingEqualsError",r[r.ExpectedCommaError=10]="ExpectedCommaError",r[r.UnclosedStringError=11]="UnclosedStringError",r[r.UnclosedObjectError=12]="UnclosedObjectError",r[r.UnmatchingTypesError=13]="UnmatchingTypesError",r[r.UnclosedBracketError=14]="UnclosedBracketError",r[r.InvalidFunctionError=15]="InvalidFunctionError",r[r.VariableDefinedError=16]="VariableDefinedError",r[r.InvalidOperationError=17]="InvalidOperationError",r[r.InvalidConditionError=18]="InvalidConditionError",r[r.InvalidAssignmentError=19]="InvalidAssignmentError",r[r.ExpectedOpenParenError=20]="ExpectedOpenParenError",r[r.MissingIdentifierError=21]="MissingIdentifierError",r[r.UnrecognizedTokenError=22]="UnrecognizedTokenError",r[r.ExpectedOpenBraceError=23]="ExpectedOpenBraceError",r[r.ExpectedCloseBrackError=24]="ExpectedCloseBrackError",r[r.ExpectedIdentifierError=25]="ExpectedIdentifierError",r[r.ExpectedCloseBraceError=26]="ExpectedCloseBraceError",r[r.VariableNotDefinedError=27]="VariableNotDefinedError",r[r.UnclosedParenthesisError=28]="UnclosedParenthesisError",r[r.ExpectedFunctionNameError=29]="ExpectedFunctionNameError",r[r.ConstantReassignmentError=30]="ConstantReassignmentError",r[r.IncompleteExpressionError=31]="IncompleteExpressionError",r[r.UnrecognizedStatementError=32]="UnrecognizedStatementError",r[r.UninitializedConstantError=33]="UninitializedConstantError",r))(d||{}),w=(r=>(r[r.Error=0]="Error",r[r.Lexer=1]="Lexer",r[r.Parser=2]="Parser",r[r.Stdout=3]="Stdout",r[r.Success=4]="Success",r[r.Interpreter=5]="Interpreter",r))(w||{});class p extends Error{constructor(t,s){super(t);g(this,"errno");g(this,"context");g(this,"location");this.location=s,this.name="LangKamaError",this.errno=d.LangKamaError}get col(){var t;return((t=this.location)==null?void 0:t.col)??0}get row(){var t;return((t=this.location)==null?void 0:t.row)??0}get loc(){return[this.row+1,this.col+1].join(":")}canShowLine(){var t,s;return typeof((t=this.location)==null?void 0:t.row)<"u"&&typeof((s=this.location)==null?void 0:s.col)<"u"}getMessage(){return`  [${this.name}] - ${this.message}.`}getContext(){var t;if(this.canShowLine()){const a=((t=this.context)==null?void 0:t.split(`
`))[this.row],c=`${this.loc} - `,l=`${c}${a}`,E=[...new Array(c.length).fill(" "),...new Array(l.length-c.length).fill("~").map((v,f)=>f===this.col?"^":v)];return E.includes("^")||E.push("^"),[`  ${l}`,`  ${E.join("")}`]}else return[null]}setContext(t){this.context=t}toString(){return[this.getMessage(),...this.getContext()].join(`
`)}}class ee extends p{constructor(e){super("invalid key",e),this.name="InvalidKeyError",this.errno=d.InvalidKeyError}}class U extends p{constructor(e){super("statements should end with a dot",e),this.name="MissingDotError",this.errno=d.MissingDotError}}class re extends p{constructor(e){super(`file "${e}" does not exist`),this.name="UnknownFileError",this.errno=d.UnknownFileError}}class te extends p{constructor(e){super("expected key",e),this.name="ExpectedKeyError",this.errno=d.ExpectedKeyError}}class se extends p{constructor(e){super(`file "${e}" is not a valid LangKama script`),this.name="InvalidFileError",this.errno=d.InvalidFileError}}class S extends p{constructor(){super("identifier is not a valid array"),this.name="InvalidArrayError",this.errno=d.InvalidArrayError}}class ne extends p{constructor(e){super("missing colon",e),this.name="MissingColonError",this.errno=d.MissingColonError}}class A extends p{constructor(){super("name is not a string"),this.name="InvalidStringError",this.errno=d.InvalidStringError}}class ae extends p{constructor(e){super("expected comma",e),this.name="ExpectedCommaError",this.errno=d.ExpectedCommaError}}class V extends p{constructor(e){super("missing assignment operation",e),this.name="MissingEqualsError",this.errno=d.MissingEqualsError}}class N extends p{constructor(e){super("unclosed string",e),this.name="UnclosedStringError",this.errno=d.UnclosedStringError}}class ie extends p{constructor(e){super("unclosed object",e),this.name="UnclosedObjectError",this.errno=d.UnclosedObjectError}}class D extends p{constructor(e){super("types do not match",e),this.name="UnmatchingTypesError",this.errno=d.UnmatchingTypesError}}class oe extends p{constructor(e){super("open bracket was left unclosed",e),this.name="UnclosedBracketError",this.errno=d.UnclosedBracketError}}class z extends p{constructor(e){super(`variable "${e}" already defined`),this.name="VariableDefinedError",this.errno=d.VariableDefinedError}}class R extends p{constructor(e){super("invalid function",e),this.name="InvalidFunctionError",this.errno=d.InvalidFunctionError}}class j extends p{constructor(e){super("a jk or sike condition should be preluded by a big if true condition",e),this.name="InvalidConditionError",this.errno=d.InvalidConditionError}}class q extends p{constructor(e){super("invalid operation",e),this.name="InvalidOperationError",this.errno=d.InvalidOperationError}}class H extends p{constructor(e){super("invalid assignment",e),this.name="InvalidAssignmentError",this.errno=d.InvalidAssignmentError}}class $ extends p{constructor(e){super("missing identifier name",e),this.name="MissingIdentifierError",this.errno=d.MissingIdentifierError}}class L extends p{constructor(e){super("unrecognized token",e),this.name="UnrecognizedTokenError",this.errno=d.UnrecognizedTokenError}}class I extends p{constructor(e){super("expected open brace",e),this.name="ExpectedOpenBraceError",this.errno=d.ExpectedOpenBraceError}}class K extends p{constructor(e){super("expected open parenthesis",e),this.name="ExpectedOpenParenError",this.errno=d.ExpectedOpenParenError}}class G extends p{constructor(e){super("expected identifier",e),this.name="ExpectedIdentifierError",this.errno=d.ExpectedIdentifierError}}class B extends p{constructor(e){super("expected close bracket",e),this.name="ExpectedCloseBrackError",this.errno=d.ExpectedCloseBrackError}}class C extends p{constructor(e){super("expected close brace",e),this.name="ExpectedCloseBraceError",this.errno=d.ExpectedCloseBraceError}}class M extends p{constructor(e){super(`variable "${e}" is not defined`),this.name="VariableNotDefinedError",this.errno=d.VariableNotDefinedError}}class y extends p{constructor(e){super("open paranthesis was left unclosed",e),this.name="UnclosedParenthesisError",this.errno=d.UnclosedParenthesisError}}class W extends p{constructor(e){super(`constant "${e}" can't be reassigned`),this.name="ConstantReassignmentError",this.errno=d.ConstantReassignmentError}}class Q extends p{constructor(e){super("incomplete expression",e),this.name="IncompleteExpressionError",this.errno=d.IncompleteExpressionError}}class _ extends p{constructor(e){super("expected function name",e),this.name="ExpectedFunctionNameError",this.errno=d.ExpectedFunctionNameError}}class J extends p{constructor(e){super("unrecognized statement",e),this.name="UnrecognizedStatementError",this.errno=d.UnrecognizedStatementError}}class X extends p{constructor(e){super("constants should always be initialized",e),this.name="UninitializedConstantError",this.errno=d.UninitializedConstantError}}var ce={version:"0.1.6"};const le=ce.version;class Y extends F{constructor(t){super([],t);g(this,"tokens");this.init()}tokenizeNumber(){let t="";for(;this.at()&&b.isNumber(this.at());)t+=this.eat();this.addToken(n.Number,t)}tokenizeIdentifier(){let t="";for(;this.at()&&(b.isAlpha(this.at())||b.isNumber(this.at()));)t+=this.eat();const s=this.index,a=t,c=Object.keys(O);let l="";for(;this.at()&&(!b.isSkippable(this.at())||this.at()===i.Space)&&(l=c.find(E=>E.startsWith(t)),t!==l);){if(!l){this.index=s,t=a;break}t+=this.eat(),t=t.split("").filter(E=>E===" "||b.isAlpha(E)||b.isNumber(E)||E===i.ClosePren).join("")}if(l=c.find(E=>E===t),O[l]===n.Comment)for(;this.at()&&this.at()!==i.NewLine;)t+=this.eat();this.addToken(O[l]??n.Identifier,t)}createToken(t,s){return{type:t,value:s??null,location:{row:this.location.row,col:this.location.col-((s==null?void 0:s.length)??0)}}}addToken(t,s){const a=this.createToken(t,s);return this.tokens.push(a),a}init(t=""){super.initBase(t.split("")),this.tokens=[]}tokenize(t){for(this.init(t);this.at();)switch(this.at()){case i.Comma:{this.addToken(n.Comma,this.eat());break}case i.Dot:{this.addToken(n.StatementEnd,this.eat());break}case i.OpenPren:{this.addToken(n.OpenParen,this.eat());break}case i.ClosePren:{this.addToken(n.CloseParen,this.eat());break}case i.OpenBrace:{this.addToken(n.OpenBrace,this.eat());break}case i.CloseBrace:{this.addToken(n.CloseBrace,this.eat());break}case i.OpenBrack:{this.addToken(n.OpenBrack,this.eat());break}case i.CloseBrack:{this.addToken(n.CloseBrack,this.eat());break}case i.DoubleQuotes:{let s="";for(this.eat();this.at()&&this.at()!==i.DoubleQuotes&&this.at()!==i.NewLine;)s+=this.eat();const a=this.addToken(n.String,s);this.expect(i.DoubleQuotes,new N(a.location));break}case i.Pipe:case i.Less:case i.Plus:case i.Star:case i.Minus:case i.Slash:case i.Equals:case i.Greater:case i.Ampersand:case i.Percentage:{this.addToken(n.BinaryOp,this.eat());break}case i.Exclamation:{this.addToken(n.LoneOp,this.eat());break}default:b.isNumber(this.at())?this.tokenizeNumber():b.isAlpha(this.at())?this.tokenizeIdentifier():b.isSkippable(this.at())?(this.at()===i.NewLine&&this.jumpLine(),this.eat()):(this.errorManager.raise(new L(this.location)),this.eat())}return this.addToken(n.EOF),this.tokens}}var u=(r=>(r[r.Skip=0]="Skip",r[r.Call=1]="Call",r[r.Loop=2]="Loop",r[r.Array=3]="Array",r[r.Number=4]="Number",r[r.Return=5]="Return",r[r.String=6]="String",r[r.Program=7]="Program",r[r.Indexing=8]="Indexing",r[r.Condition=9]="Condition",r[r.Identifier=10]="Identifier",r[r.LoneExpression=11]="LoneExpression",r[r.BinaryExpression=12]="BinaryExpression",r[r.VariableDeclaration=13]="VariableDeclaration",r[r.FunctionDeclaration=14]="FunctionDeclaration",r[r.AssignmentExpression=15]="AssignmentExpression",r))(u||{});class Z extends F{constructor(e){super([],e,(t,s)=>!!t&&t===s.type)}notEof(){return this.at().type!==n.EOF}parseStatement(){switch(this.at().type){case n.Return:return this.parseReturn();case n.If:return this.parseCondition();case n.While:return this.parseLoop();case n.Comment:return this.parseComment();case n.Let:case n.Const:return this.parseVariableDeclaration();case n.Function:return this.parseFunctionDeclaration();default:return this.parseExpression()}}parseComment(){const e={kind:u.Skip,end:this.at().location,start:this.at().location};return this.eat(),e}parseExpression(){return this.parseAssignmentExpression()}parseAssignmentExpression(){const e=this.parseAdditiveExpression();if(this.at().type===n.Equals){this.eat();const t=this.parseAssignmentExpression();return{value:t,assigne:e,kind:u.AssignmentExpression,end:{row:t.end.row,col:t.end.col},start:{row:e.start.row,col:e.start.col}}}return e}parseLoneExpression(){const e=this.eat(),t=this.parseExpression();return{expression:t,end:t.end,start:e==null?void 0:e.location,operator:e==null?void 0:e.value,kind:u.LoneExpression}}parseArray(){const e=this.eat(),t=[];for(;this.at()&&this.at().type!==n.CloseBrack;)t.push(this.parseExpression()),this.at().type===n.Comma&&this.eat();const s=this.expect(n.CloseBrack,new B(this.at().location));return{items:t,kind:u.Array,end:s.location,start:e==null?void 0:e.location}}parseAdditiveExpression(){let e=this.parseMultiplicativeExpression();for(;[i.Plus,i.Minus,i.Equals,i.Less,i.Greater,i.Ampersand,i.Pipe].includes(this.at().value);){const t=this.eat().value,s=this.parseMultiplicativeExpression();e={left:e,right:s,operator:t,kind:u.BinaryExpression,end:{row:s.end.row,col:s.end.col},start:{row:e.start.row,col:e.start.col}}}return e}parseMultiplicativeExpression(){let e=this.parseCallPrimaryExpression();for(;[i.Star,i.Slash,i.Percentage].includes(this.at().value);){const t=this.eat().value,s=this.parseCallPrimaryExpression();e={left:e,right:s,operator:t,kind:u.BinaryExpression,end:{row:s.end.row,col:s.end.col},start:{row:e.start.row,col:e.start.col}}}return e}parseCallPrimaryExpression(){const e=this.parsePrimaryExpression();switch(this.at().type){case n.OpenParen:return this.parseCallExpression(e);case n.OpenBrack:return this.parseIndexingExpression(e);default:return e}}parseIndexingExpression(e){this.eat();const t=this.parseExpression(),s=this.expect(n.CloseBrack,new B(this.at().location));return{index:t,identifier:e,kind:u.Indexing,start:e.start,end:s==null?void 0:s.location}}parseCallExpression(e){const t=this.parseArguments(),s=t.slice(0).reverse()[0];let a={caller:e,arguments:t,kind:u.Call,start:e.start,end:(s==null?void 0:s.end)??e.start};return this.at().type===n.OpenParen&&(a=this.parseCallExpression(a)),a}parseArguments(){this.expect(n.OpenParen,new K(this.at().location));const e=this.at().type===n.CloseParen?[]:this.parseArgumentsList();return this.expect(n.CloseParen,new y(this.at().location)),e}parseArgumentsList(){const e=[this.parseAssignmentExpression()];for(;this.at().type===n.Comma&&this.eat();)e.push(this.parseAssignmentExpression());return e}parsePrimaryExpression(){var t,s,a;const e=this.at();switch(e.type){case n.StatementEnd:{const c={kind:u.Skip,end:this.at().location,start:this.at().location};return this.eat(),c}case n.Identifier:{const c={symbol:e.value,kind:u.Identifier,start:{row:e.location.row,col:e.location.col},end:{row:e.location.row,col:e.location.col+(((t=e.value)==null?void 0:t.length)??0)}};return this.eat(),c}case n.Number:{const c={kind:u.Number,value:parseFloat(e.value),start:{row:e.location.row,col:e.location.col},end:{row:e.location.row,col:e.location.col+(((s=e.value)==null?void 0:s.length)??0)}};return this.eat(),c}case n.String:{const c={kind:u.String,value:e.value,start:{row:e.location.row,col:e.location.col},end:{row:e.location.row,col:e.location.col+(((a=e.value)==null?void 0:a.length)??0)}};return this.eat(),c}case n.OpenBrack:return this.parseArray();case n.OpenParen:{this.eat();const c=this.parseExpression();return this.expect(n.CloseParen,new y(this.at().location)),c}case n.LoneOp:return this.parseLoneExpression();case n.Else:case n.ElseIf:return this.errorManager.raise(new j(this.at().location)),this.eat(),{kind:u.Skip,end:this.at().location,start:this.at().location};case n.EOF:return this.errorManager.raise(new Q(this.at().location)),this.eat(),{kind:u.Skip,end:this.at().location,start:this.at().location};default:{const c={kind:u.Skip,end:this.at().location,start:this.at().location};return this.errorManager.raise(new L(this.at().location)),this.eat(),c}}}parseVariableDeclaration(){let e=!1;const t=this.eat(),s=t.type===n.Const,a=this.expect(n.Identifier,new $(this.at().location));if(this.at().type===n.OpenBrack&&(this.eat(),this.expect(n.CloseBrack,new B(this.at().location)),e=!0),this.at().type===n.StatementEnd){const E=this.eat();return s?(this.errorManager.raise(new X(this.at().location)),{kind:u.Skip,end:this.at().location,start:this.at().location}):{array:e,constant:!1,end:E.location,identifier:a.value,start:t.location,kind:u.VariableDeclaration}}this.expect(n.Equals,new V(this.at().location));const c=this.parseExpression(),l={array:e,constant:s,value:c,identifier:a.value,end:c.end,start:t.location,kind:u.VariableDeclaration};return this.expect(n.StatementEnd,new U(l.end)),l}parseFunctionDeclaration(){const e=this.eat(),t=this.expect(n.Identifier,new _(this.at().location)).value,s=this.parseArguments(),a=[];for(const v of s)v.kind!==u.Identifier?this.errorManager.raise(new G(v.start)):a.push(v.symbol);this.expect(n.OpenBrace,new I(this.at().location));const c=[];for(;this.notEof()&&this.at().type!==n.CloseBrace;)c.push(this.parseStatement());const l=this.expect(n.CloseBrace,new C(this.at().location));return{body:c,name:t,parameters:a,end:l==null?void 0:l.location,start:e==null?void 0:e.location,kind:u.FunctionDeclaration}}parseCondition(){const e=[],t=()=>{const E=this.eat(),v=this.parseExpression();this.expect(n.OpenBrace,new I(this.at().location));const f=[];for(;this.at()&&this.at().type!==n.CloseBrace;)f.push(this.parseStatement());const x=this.expect(n.CloseBrace,new C(this.at().location));return{startNode:E,condition:v,body:f,endNode:x}};let{startNode:s,body:a,condition:c,endNode:l}=t();for(e.push({body:a,condition:c});[n.Else,n.ElseIf].includes(this.at().type);)if(this.at().type===n.ElseIf){const{endNode:E,body:v,condition:f}=t();l=E,e.push({body:v,condition:f})}else{this.eat(),this.expect(n.OpenBrace,new I(this.at().location));const E=[];for(;this.at()&&this.at().type!==n.CloseBrace;)E.push(this.parseStatement());e.push({body:E}),this.expect(n.CloseBrace,new C(this.at().location));break}return{conditions:e,end:l==null?void 0:l.location,kind:u.Condition,start:s==null?void 0:s.location}}parseLoop(){const e=this.eat(),t=this.parseExpression();this.expect(n.OpenBrace,new I(this.at().location));const s=[];for(;this.at()&&this.at().type!==n.CloseBrace;)s.push(this.parseStatement());return this.expect(n.CloseBrace,new C(this.at().location)),{body:s,condition:t,end:t.end,kind:u.Loop,start:e==null?void 0:e.location}}parseReturn(){const e=this.eat(),t=this.parseExpression();return{kind:u.Return,value:t,end:t.end,start:e==null?void 0:e.location}}parse(e){this.content=[...e];const t={body:[],kind:u.Program,end:{row:0,col:0},start:{row:0,col:0}};for(;this.notEof();)t.body.push(this.parseStatement());return{...t,end:this.at().location}}}class h{static createValue(e){let t;switch(typeof e){case"number":{t=m.Number;break}case"boolean":{t=m.Boolean;break}case"string":{t=m.String;break}default:t=m.Null}return{type:t,value:e}}static createSkip(){return{type:m.Skip}}static createNull(){return{type:m.Null,value:null}}static createNumber(e){return{type:m.Number,value:e}}static createString(e){return{type:m.String,value:e}}static createBoolean(e){return{type:m.Boolean,value:e}}static createArray(e){return{type:m.Array,value:Array.from(e)}}static createFunction(e){return{type:m.NativeFunction,call:e}}}class P{constructor(e,t){g(this,"errorManager");g(this,"parent");g(this,"variables");g(this,"onStdoutEventHandler");this.parent=e,this.variables=new Map,t&&(this.errorManager=new k(t)),e||this.setupScope()}setupScope(){this.declareVariable("bruh",h.createNull(),!0),this.declareVariable("W",h.createBoolean(!0),!0),this.declareVariable("L",h.createBoolean(!1),!0),this.declareVariable("loncina",h.createFunction(e=>{const t=e.filter(s=>"value"in s).map(s=>s.type===m.Array?JSON.stringify(s.value):s.value);return this.onStdoutEventHandler(t.join(" ")),h.createNull()}),!0),this.declareVariable("bait",h.createFunction(e=>{const t=e[0].value??"bruh";return h.createString(t.toString())}),!0),this.declareVariable("length",h.createFunction(e=>{var s;const[t]=e;return t.type!==m.Array&&((s=this.errorManager)==null||s.raise(new S)),h.createNumber(t.value.length)}),!0),this.declareVariable("push",h.createFunction(e=>{var l,E;const[t,s]=e;t.type!==m.String&&((l=this.errorManager)==null||l.raise(new A));const a=this.getValue(t.value).value;a.type!==m.Array&&((E=this.errorManager)==null||E.raise(new S));const c=[...a.value];return c.push(s.value),this.assignVariable(t.value,h.createArray(c)),h.createNumber(c.length)}),!0),this.declareVariable("pop",h.createFunction(e=>{var l,E;const[t]=e;t.type!==m.String&&((l=this.errorManager)==null||l.raise(new A));const s=this.getValue(t.value).value;s.type!==m.Array&&((E=this.errorManager)==null||E.raise(new S));const a=[...s.value],c=a.pop();return this.assignVariable(t.value,h.createArray(a)),h.createNumber(c)}),!0)}setStdoutCallback(e){this.onStdoutEventHandler=e}setErrorCallback(e){var t;this.errorManager?(t=this.errorManager)==null||t.setCallback(e):this.errorManager=new k(e)}declareVariable(e,t,s=!1){var a;return this.variables.has(e)&&((a=this.errorManager)==null||a.raise(new z(e))),this.variables.set(e,{name:e,constant:s,value:t}),t}assignVariable(e,t){var c,l;this.variables.has(e)||(c=this.errorManager)==null||c.raise(new M(e));const s=this.resolve(e),a=s.getValue(e);return a!=null&&a.constant&&((l=this.errorManager)==null||l.raise(new W(e))),s.variables.set(e,{...a,value:t}),t}getValue(e){return this.resolve(e).variables.get(e)}resolve(e){var t;return this.variables.has(e)?this:this.parent?this.parent.resolve(e):((t=this.errorManager)==null||t.raise(new M(e)),this)}}class ue{constructor(){g(this,"onOutEventHandler");g(this,"onErrorEventListener");g(this,"onLexerEventListener");g(this,"onSuccessEventListener");g(this,"onParserEventListener");g(this,"onInterpreterEventListener");this.onOutEventHandler=()=>{},this.onErrorEventListener=()=>{},this.onLexerEventListener=()=>{},this.onParserEventListener=()=>{},this.onSuccessEventListener=()=>{},this.onInterpreterEventListener=()=>{}}interpret(e,t){const s=new k(this.onErrorEventListener,e);try{const a=new T(this.onOutEventHandler),c=new Y(s.raise.bind(s)),l=new Z(s.raise.bind(s)),E=t??new P(null,s.raise.bind(s));this.onLexerEventListener(e);const v=c.tokenize(e);this.onParserEventListener(v);const f=l.parse(v);this.onInterpreterEventListener(f);const x=a.evaluate(f,E);s.hasErrors()||this.onSuccessEventListener(x)}catch(a){s.raise(a)}finally{return this}}on(e,t){switch(e){case w.Error:{this.onErrorEventListener=t;break}case w.Stdout:{this.onOutEventHandler=t;break}case w.Success:{this.onSuccessEventListener=t;break}case w.Lexer:{this.onLexerEventListener=t;break}case w.Parser:{this.onParserEventListener=t;break}case w.Interpreter:{this.onInterpreterEventListener=t;break}}return this}}class T{constructor(e){g(this,"onStdoutEventHandler");this.onStdoutEventHandler=e??(()=>{})}evaluateProgram(e,t){let s=h.createNull();for(const a of e.body){const c=this.evaluate(a,t);c.type!==m.Skip&&(s=c)}return s}evaluateVariableDeclaration(e,t){let s=e.value?this.evaluate(e.value,t):e.array?h.createArray([]):h.createNull();return t.declareVariable(e.identifier,s,e.constant)}evaluateFunctionDeclaration(e,t){const s={env:t,type:m.Function,body:e.body,name:e.name,parameters:e.parameters};return t.declareVariable(e.name,s,!0)}evaluateConditionBlock(e,t){for(const s of e.conditions)if(s.condition){if(this.evaluate(s.condition,t).value){s.body.forEach(c=>this.evaluate(c,t));break}}else{s.body.forEach(a=>this.evaluate(a,t));break}return h.createSkip()}evaluateLoop(e,t){for(;!this.evaluate(e.condition,t).value;)e.body.forEach(s=>this.evaluate(s,t));return h.createSkip()}evaluateLoneExpression(e,t){const s=this.evaluate(e.expression,t);return h.createBoolean(!s.value)}evaluateBinaryExpression(e,t){var c,l;const s=this.evaluate(e.left,t),a=this.evaluate(e.right,t);if(s.type!==a.type)return(c=t.errorManager)==null||c.raise(new D(e.start)),h.createNull();if([i.Equals,i.Greater,i.Less,i.Ampersand,i.Pipe].includes(e.operator))return this.evaluateBooleanBinaryExpression(s,a,e.operator);switch(s.type){case m.Number:return this.evaluateNumericBinaryExpression(s,a,e.operator);case m.String:return e.operator==="+"?h.createString(s.value+a.value):((l=t.errorManager)==null||l.raise(new q(e.start)),h.createNull());default:return h.createNull()}}evaluateBooleanBinaryExpression(e,t,s){let a=!1;switch(s){case i.Equals:{a=e.value===t.value;break}case i.Greater:{a=e.value>t.value;break}case i.Less:{a=e.value<t.value;break}case i.Ampersand:{a=!!(e.value&&t.value);break}case i.Pipe:{a=!!(e.value||t.value);break}}return h.createBoolean(a)}evaluateNumericBinaryExpression(e,t,s){let a=0;switch(s){case i.Plus:{a=e.value+t.value;break}case i.Minus:{a=e.value-t.value;break}case i.Star:{a=e.value*t.value;break}case i.Slash:{a=e.value/t.value;break}case i.Percentage:{a=e.value%t.value;break}}return h.createNumber(a)}evaluateArray(e,t){const s=e.items.map(a=>this.evaluate(a,t).value);return h.createArray(s)}evaluateIdentifier(e,t){return t.getValue(e.symbol).value}evaluateIndexing(e,t){const s=this.evaluate(e.index,t),l=this.evaluate(e.identifier,t).value[s.value];return l!=null?h.createValue(l):h.createNull()}evaluateFunction(e,t){var c;const s=e.arguments.map(l=>this.evaluate(l,t)),a=this.evaluate(e.caller,t);if(a.type===m.NativeFunction)return a.call(s,t);if(a.type===m.Function){const l=a,E=new P(l.env);for(let x=0;x<l.parameters.length;++x){const he=l.parameters[x],de=s[x];E.declareVariable(he,de)}let v=!1,f=h.createNull();for(const x of l.body)if(x.kind!==u.Skip&&(f=this.evaluate(x,E),x.kind===u.Return)){v=!0;break}return v?f:h.createNull()}return(c=t.errorManager)==null||c.raise(new R(e.start)),h.createNull()}evaluateAssignment(e,t){var s;switch(e.assigne.kind){case u.Identifier:{const a=e.assigne.symbol;return t.assignVariable(a,this.evaluate(e.value,t))}case u.Indexing:{const a=e.assigne,l=a.identifier.symbol,v=[...t.getValue(l).value.value],f=this.evaluate(a.index,t).value;v[f]=this.evaluate(e.value,t).value;const x=h.createArray(v);return t.assignVariable(l,x)}default:return(s=t.errorManager)==null||s.raise(new H(e.start)),h.createNull()}}evaluateReturn(e,t){return this.evaluate(e.value,t)}evaluate(e,t){var s;switch(t.setStdoutCallback(this.onStdoutEventHandler),e.kind){case u.Number:return h.createNumber(e.value);case u.String:return h.createString(e.value);case u.Array:return this.evaluateArray(e,t);case u.Identifier:return this.evaluateIdentifier(e,t);case u.Indexing:return this.evaluateIndexing(e,t);case u.Call:return this.evaluateFunction(e,t);case u.AssignmentExpression:return this.evaluateAssignment(e,t);case u.BinaryExpression:return this.evaluateBinaryExpression(e,t);case u.LoneExpression:return this.evaluateLoneExpression(e,t);case u.Program:return this.evaluateProgram(e,t);case u.VariableDeclaration:return this.evaluateVariableDeclaration(e,t);case u.FunctionDeclaration:return this.evaluateFunctionDeclaration(e,t);case u.Condition:return this.evaluateConditionBlock(e,t);case u.Loop:return this.evaluateLoop(e,t);case u.Skip:return h.createSkip();case u.Return:return this.evaluateReturn(e,t);default:return(s=t.errorManager)==null||s.raise(new J(e.start)),h.createNull()}}}o.ConstantReassignmentError=W,o.Environment=P,o.Errno=d,o.ErrorManager=k,o.Evaluator=T,o.ExpectedCloseBraceError=C,o.ExpectedCloseBrackError=B,o.ExpectedCommaError=ae,o.ExpectedFunctionNameError=_,o.ExpectedIdentifierError=G,o.ExpectedKeyError=te,o.ExpectedOpenBraceError=I,o.ExpectedOpenParenError=K,o.IncompleteExpressionError=Q,o.InvalidArrayError=S,o.InvalidAssignmentError=H,o.InvalidConditionError=j,o.InvalidFileError=se,o.InvalidFunctionError=R,o.InvalidKeyError=ee,o.InvalidOperationError=q,o.InvalidStringError=A,o.LangKama=ue,o.LangKamaError=p,o.LangKamaEvent=w,o.Lexer=Y,o.MissingColonError=ne,o.MissingDotError=U,o.MissingEqualsError=V,o.MissingIdentifierError=$,o.Parser=Z,o.Type=m,o.UnclosedBracketError=oe,o.UnclosedObjectError=ie,o.UnclosedParenthesisError=y,o.UnclosedStringError=N,o.UninitializedConstantError=X,o.UnknownFileError=re,o.UnmatchingTypesError=D,o.UnrecognizedStatementError=J,o.UnrecognizedTokenError=L,o.VariableDefinedError=z,o.VariableNotDefinedError=M,o.version=le,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
