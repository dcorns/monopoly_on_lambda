/**
 * configure-card-collection-view.spec
 * Created by dcorns on 5/17/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const expect = require('chai').expect;
const jsdom = require('jsdom');
const proxyquire = require('proxyquire');
const {JSDOM} = jsdom;
let configureCardCollectionView = proxyquire('../../modules/configure-card-collection-view', {'./check-for-one-zero': () => 'winner text'});

describe('configureCardCollectionView', () => {
  global.dom = new JSDOM(`<body>
<input id="ticket" type="text" placeholder="enter prize piece number"><button id="btnEnter" type="button">ENTER</button>
<button id="btnLogin" type="button">LOGIN
</button><input id="emailOrPhone" type="text" placeholder="Enter email address or texting number to receive access" class="hide"><button id="btnSendTokenRequest" type="button" class="hide">SEND</button>
<main>
    <svg width="800" height="700" viewBox="-400 -300 800 690" id="svgRoot">
        <rect id="p0" x="-400" y="-300" width="110" height="125" fill="#81C98A" stroke="black" data-winner=""></rect>
        <rect id="p0" x="-400" y="-300" width="110" height="25" fill="#0DDB45" stroke="black"></rect>
        <text id="t0" x="-345" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$5 Grocery Card</text>
        <text id="w0" x="-345" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p1" x="-285" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p1" x="-285" y="-300" width="110" height="25" fill="#D240D7" stroke="black"></rect>
        <text id="t1" x="-230" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$10 Grocery Card</text>
        <text id="w1" x="-230" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p2" x="-170" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p2" x="-170" y="-300" width="110" height="25" fill="#F65601" stroke="black"></rect>
        <text id="t2" x="-115" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$15 Grocery Card</text>
        <text id="w2" x="-115" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p3" x="-55" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p3" x="-55" y="-300" width="110" height="25" fill="#F1202D" stroke="black"></rect>
        <text id="t3" x="0" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$25 Mall Card</text>
        <text id="w3" x="0" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p4" x="60" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p4" x="60" y="-300" width="110" height="25" fill="#EEA06E" stroke="black"></rect>
        <text id="t4" x="115" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$25 Grocery Card</text>
        <text id="w4" x="115" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p5" x="175" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p5" x="175" y="-300" width="110" height="25" fill="#54B7C9" stroke="black"></rect>
        <text id="t5" x="230" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$25 Cash</text>
        <text id="w5" x="230" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p6" x="290" y="-300" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p6" x="290" y="-300" width="110" height="25" fill="#F7194C" stroke="black"></rect>
        <text id="t6" x="345" y="-284" font-size="12px" text-anchor="middle" pointer-events="none">$50 Grocery Card</text>
        <text id="w6" x="345" y="-250" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>



        <rect id="p7" x="-400" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p7" x="-400" y="-170" width="110" height="25" fill="#F65601" stroke="black"></rect>
        <text id="t7" x="-345" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">Red Box</text>
        <text id="w7" x="-345" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p8" x="-285" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p8" x="-285" y="-170" width="110" height="25" fill="#F1202D" stroke="black"></rect>
        <text id="t8" x="-230" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">$100 Grocery Card</text>
        <text id="w8" x="-230" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p9" x="-170" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p9" x="-170" y="-170" width="110" height="25" fill="#FFFD38" stroke="black"></rect>
        <text id="t9" x="-115" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">$100 Cash</text>
        <text id="w9" x="-115" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p10" x="-55" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p10" x="-55" y="-170" width="110" height="25" fill="#D240D7" stroke="black"></rect>
        <text id="t10" x="0" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">$200 Cash</text>
        <text id="w10" x="0" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p11" x="60" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p11" x="60" y="-170" width="110" height="25" fill="#0DDB45" stroke="black"></rect>
        <text id="t11" x="115" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">Family Picnic</text>
        <text id="w11" x="115" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p12" x="175" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p12" x="175" y="-170" width="110" height="25" fill="#EEA06E" stroke="black"></rect>
        <text id="t12" x="230" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">SPA Treatment</text>
        <text id="w12" x="230" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p13" x="290" y="-170" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p13" x="290" y="-170" width="110" height="25" fill="#54B7C9" stroke="black"></rect>
        <text id="t13" x="345" y="-154" font-size="12px" text-anchor="middle" pointer-events="none">Weekend Getaway</text>
        <text id="w13" x="345" y="-120" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>



        <rect id="p14" x="-400" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p14" x="-400" y="-40" width="110" height="25" fill="#F7194C" stroke="black"></rect>
        <text id="t14" x="-345" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">$1000 Grocery Card</text>
        <text id="w14" x="-345" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p15" x="-285" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p15" x="-285" y="-40" width="110" height="25" fill="#F65601" stroke="black"></rect>
        <text id="t15" x="-230" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">$1000 Cash</text>
        <text id="w15" x="-230" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p16" x="-170" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p16" x="-170" y="-40" width="110" height="25" fill="#F1202D" stroke="black"></rect>
        <text id="t16" x="-115" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">LED HD TV</text>
        <text id="w16" x="-115" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p17" x="-55" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p17" x="-55" y="-40" width="110" height="25" fill="#FFFD38" stroke="black"></rect>
        <text id="t17" x="0" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">BigJoe Grill+</text>
        <text id="w17" x="0" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p18" x="60" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p18" x="60" y="-40" width="110" height="25" fill="#0DDB45" stroke="black"></rect>
        <text id="t18" x="115" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">$5000 Groceries</text>
        <text id="w18" x="115" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p19" x="175" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p19" x="175" y="-40" width="110" height="25" fill="#D240D7" stroke="black"></rect>
        <text id="t19" x="230" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">$5000 Cash</text>
        <text id="w19" x="230" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p20" x="290" y="-40" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p20" x="290" y="-40" width="110" height="25" fill="#EEA06E" stroke="black"></rect>
        <text id="t20" x="345" y="-24" font-size="12px" text-anchor="middle" pointer-events="none">Family Vacation</text>
        <text id="w20" x="345" y="10" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>




        <rect id="p21" x="-400" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p21" x="-400" y="90" width="110" height="25" fill="#54B7C9" stroke="black"></rect>
        <text id="t21" x="-345" y="106" font-size="12px" text-anchor="middle" pointer-events="none">Jet Ski</text>
        <text id="w21" x="-345" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p22" x="-285" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p22" x="-285" y="90" width="110" height="25" fill="#F7194C" stroke="black"></rect>
        <text id="t22" x="-230" y="106" font-size="12px" text-anchor="middle" pointer-events="none">College Tuition</text>
        <text id="w22" x="-230" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p23" x="-170" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p23" x="-170" y="90" width="110" height="25" fill="#FFFD38" stroke="black"></rect>
        <text id="t23" x="-115" y="106" font-size="12px" text-anchor="middle" pointer-events="none">Vehicle of Choice</text>
        <text id="w23" x="-115" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p24" x="-55" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p24" x="-55" y="90" width="110" height="25" fill="#0DDB45" stroke="black"></rect>
        <text id="t24" x="0" y="106" font-size="12px" text-anchor="middle" pointer-events="none">Home Makeover</text>
        <text id="w24" x="0" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p25" x="60" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p25" x="60" y="90" width="110" height="25" fill="#D240D7" stroke="black"></rect>
        <text id="t25" x="115" y="106" font-size="12px" text-anchor="middle" pointer-events="none">$100,000 Cash or Car</text>
        <text id="w25" x="115" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p26" x="175" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p26" x="175" y="90" width="110" height="25" fill="#7B868F" stroke="black"></rect>
        <text id="t26" x="230" y="106" font-size="12px" text-anchor="middle" pointer-events="none">Vacation Home</text>
        <text id="w26" x="230" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p27" x="290" y="90" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p27" x="290" y="90" width="110" height="25" fill="#FC971E" stroke="black"></rect>
        <text id="t27" x="345" y="106" font-size="12px" text-anchor="middle" pointer-events="none">1,000,000 Cash</text>
        <text id="w27" x="345" y="140" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>


        <rect id="p28" x="-400" y="220" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p28" x="-400" y="220" width="110" height="25" fill="#7B868F" stroke="black"></rect>
        <text id="t28" x="-345" y="236" font-size="12px" text-anchor="middle" pointer-events="none"></text>
        <text id="w28" x="-345" y="270" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p29" x="-285" y="220" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p29" x="-285" y="220" width="110" height="25" fill="#FC971E" stroke="black"></rect>
        <text id="t29" x="-230" y="236" font-size="12px" text-anchor="middle" pointer-events="none"></text>
        <text id="w29" x="-230" y="270" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <rect id="p30" x="-170" y="220" width="110" height="125" fill="#81C98A" stroke="black"></rect>
        <rect id="p30" x="-170" y="220" width="110" height="25" fill="#FC971E" stroke="black"></rect>
        <text id="t30" x="-115" y="236" font-size="12px" text-anchor="middle" pointer-events="none"></text>
        <text id="w30" x="-115" y="270" font-size="18px" text-anchor="middle" fill="black" pointer-events="none"></text>

        <circle id="largeCardClose" r="4" cx="-500" cy="-400" fill="#81C98A"></circle>
        <text id="largeCardSubTitle" class=winnerTxt x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <circle id="btnAdd0" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd2" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd4" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd6" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd8" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd10" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd12" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnAdd14" r="5" cx="-500" cy="-400" fill="#0DDB45"></circle>
        <circle id="btnMinus0" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus2" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus4" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus6" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus8" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus10" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus12" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <circle id="btnMinus14" r="5" cx="-500" cy="-400" fill="#F1202D"></circle>
        <text id="part1" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part2" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part3" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part4" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part5" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part6" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part7" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="part8" class="partTxt" x="-500" y="-400" font-size="8" pointer-events="none"></text>
        <text id="addTxt0" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt2" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt4" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt6" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt8" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt10" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt12" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
        <text id="addTxt14" class="addTxt" x="-500" y="-400" font-size="8" text-anchor="middle" pointer-events="none">0</text>
    </svg>
</main>
</body>`);
  const objArray = [{"name":"Cash $5.00","value":5,"available":800000,"tickets":{"required":4,"partList":["9J36A",7,"9J37B",0,"9J38C",12,"9J39D",7,null,null,null,null,null,null,null,null,null],"winner":"9J37B"},"startAvailable":800000,"viewId":"p7"},{"_id":"56d0daaea1f6053f7b7f5a76","available":37500,"name":"Cash $10.00","tickets":{"partList":["9G28A",14,"9G29B",8,"9G30C",14,"9G31D",0],"required":4,"winner":"9G31D"},"value":10,"viewId":"p6"},{"_id":"56d0db34a1f6053f7b7f5a77","available":10000,"name":"Cash $25.00","tickets":{"partList":["9C12A",7,"9C13B",10,"9C14C",10,"9C15D",0],"required":4,"winner":"9C15D"},"value":25,"viewId":"p5"},{"_id":"56d0dbb7a1f6053f7b7f5a78","available":25000,"name":"$15 Grocery Gift Card","tickets":{"partList":["9E20A",14,"9E21B",8,"9E22C",0,"9E23D",17],"required":4,"winner":"K549C"},"value":15,"viewId":"p4"},{"_id":"56d0dc55a1f6053f7b7f5a79","available":37500,"name":"$10 Grocery Gift Card","startAvailable":37500,"tickets":{"partList":["9F24A",8,"9F25B",6,"9F26C",0,"9F27D",10],"required":4,"winner":"9F26C"},"value":10,"viewId":"p19"},{"_id":"56d0dcc2a1f6053f7b7f5a7a","available":800000,"name":"$5 Grocery Gift Card","startAvailable":800000,"tickets":{"partList":["9H32A",0,"9H33B",8,"9H34C",6,"9H35D",7],"required":4,"winner":"9H32A"},"value":5,"viewId":"p18"},{"_id":"56d0dd92a1f6053f7b7f5a7b","available":100,"name":"Grill & Groceries","startAvailable":100,"tickets":{"partList":["8H69A",4,"8H70B",8,"8H71C",13,"8H72D",0],"required":4,"winner":"8H72D"},"value":1500,"viewId":"p17"},{"_id":"56d0de26a1f6053f7b7f5a7c","available":100,"name":"LED HD TV","startAvailable":100,"tickets":{"partList":["8J65A",10,"8J66B",0,"8J67C",8,"8J68D",8],"required":4,"winner":"8J66B"},"value":1500,"viewId":"p16"},{"_id":"56d0dea1a1f6053f7b7f5a7d","available":50,"name":"$5000 Grocery Card","startAvailable":50,"tickets":{"partList":["8G73A",3,"8G74B",7,"8G75C",0,"8G76D",16],"required":4,"winner":"8G75C"},"value":5000,"viewId":"p15"},{"_id":"56d0df31a1f6053f7b7f5a7e","available":50,"name":"$5000 Cash","startAvailable":50,"tickets":{"partList":["8F77A",0,"8F78B",10,"8F79C",8,"8F80D",3],"required":4,"winner":"8F77A"},"value":5000,"viewId":"p14"},{"_id":"56d0dffda1f6053f7b7f5a7f","available":600,"name":"Smart Watch","startAvailable":600,"tickets":{"partList":["8P45A",12,"8P46B",6,"8P47C",0,"8P48D",10],"required":4,"winner":"8P47C"},"value":300,"viewId":"p13"},{"name":"Family Picnic","value":200,"available":750,"tickets":{"required":4,"partList":["8Q41A",0,"8Q42B",7,"8Q43C",3,"8Q44D",8,null,null,null,null,null,null,null,null,null],"winner":"8Q41A"},"startAvailable":750,"viewId":"p12"},{"_id":"56d0e0eba1f6053f7b7f5a81","available":750,"name":"$200 Cash","tickets":{"partList":["8R37A",7,"8R38B",9,"8R39C",9,"8R40D",0],"required":4,"winner":"8R40D"},"value":200,"viewId":"p10"},{"_id":"56d0e168a1f6053f7b7f5a82","available":5000,"name":"$50 Grocery Gift Card","tickets":{"partList":["8V25A",6,"8V26B",6,"8V27C",0,"8V28D",8],"required":4,"winner":"8V27C"},"value":50,"viewId":"p11"},{"_id":"56d0e1ffa1f6053f7b7f5a83","available":2500,"name":"$100 Cash","tickets":{"partList":["8T29A",8,"8T30B",7,"8T31C",7,"8T32D",0],"required":4,"winner":"8T32D"},"value":100,"viewId":"p9"},{"_id":"56d0e257a1f6053f7b7f5a84","available":2500,"name":"$100 Grocery Gift Card","tickets":{"partList":["8S33A",11,"8S34B",0,"8S35C",8,"8S36D",9],"required":4,"winner":"8S34B"},"value":100,"viewId":"p8"},{"_id":"56d0e372a1f6053f7b7f5a85","available":3,"name":"$1,000,000","tickets":{"partList":["8Z01A",8,"8Z02B",3,"8Z03C",3,"8Z04D",6,"8Z05E",7,"8Z06F",7,"8Z07G",0,"8Z08H",0],"required":8,"winner":"8Z07G"},"value":1000000,"viewId":"p27"},{"_id":"56d0e448a1f6053f7b7f5a86","available":3,"name":"Vacation Home","tickets":{"partList":["8Y09A",18,"8Y10B",7,"8Y11C",7,"8Y12D",10,"8Y13E",9,"8Y14F",0,"8Y15G",5,"8Y16H",1],"required":8,"winner":"8Y14F"},"value":1000000,"viewId":"p26"},{"_id":"56d0e684a1f6053f7b7f5a87","available":15,"name":"Cash or Luxury Car","tickets":{"partList":["8E81A",3,"8E82B",0,"8E83C",4,"8E84D",10,"8E85E",0],"required":5,"winner":""},"value":100000,"viewId":"p25"},{"_id":"56d0e728a1f6053f7b7f5a88","available":25,"name":"Home Makeover","startAvailable":25,"tickets":{"partList":["8D86A",0,"8D87B",0,"8D88C",10,"8D89D",10,"8D90E",10],"required":5,"winner":""},"value":40000,"viewId":"p24"},{"_id":"56d0e7aba1f6053f7b7f5a89","available":25,"name":"Vehicle of your choice","startAvailable":25,"tickets":{"partList":["8C91A",0,"8C92B",5,"8C93C",0,"8C94D",12,"8C95E",5],"required":5,"winner":""},"value":35000,"viewId":"p23"},{"_id":"56d0e81da1f6053f7b7f5a8a","available":50,"name":"College Tuition","tickets":{"partList":["8B96A",8,"8B97B",13,"8B98C",13,"8B99D",0,"8B00E",0],"required":5,"winner":""},"value":20000,"viewId":"p22"},{"_id":"56d0e89ea1f6053f7b7f5a8b","available":50,"name":"4-Wheeler","tickets":{"partList":["9A02A",9,"9A03B",0,"9A04C",0,"9A05D",4,"9A06E",10],"required":5,"winner":""},"value":10000,"viewId":"p21"},{"name":"Family Vacation","value":10000,"available":50,"tickets":{"required":5,"partList":["9B07A",0,"9B08B",9,"9B09C",7,"9B10D",0,"9B11E",8,null,null,null,null,null,null,null],"winner":"9B07A"},"startAvailable":50,"viewId":"p20"},{"_id":"56d0e98ba1f6053f7b7f5a8d","available":10000,"name":"Fandango Gift Card","tickets":{"partList":["9D16A",0,"9D17B",10,"9D18C",11,"9D19D",6],"required":4,"winner":"9D16A"},"value":25,"viewId":"p3"},{"_id":"56d0e9eca1f6053f7b7f5a8e","available":10000,"name":"$25 Mall Gift Card","tickets":{"partList":["8X17A",8,"8X18B",0,"8X19C",5,"8X20D",9],"required":4,"winner":"8X18B"},"value":25,"viewId":"p2"},{"_id":"56d0ea40a1f6053f7b7f5a8f","available":10000,"name":"$25 Grocery Gift Card","tickets":{"partList":["8W21A",0,"8W22B",8,"8W23C",11,"8W24D",9],"required":4,"winner":"8W21A"},"value":25,"viewId":"p1"},{"_id":"56d0eaa2a1f6053f7b7f5a90","available":350,"name":"$500 Grocery Gift Card","tickets":{"partList":["8N49A",14,"8N50B",9,"8N51C",0,"8N52D",3],"required":4,"winner":"8N51C"},"value":500,"viewId":"p0"},{"_id":"589fad4d0aee383e8a17aa79","available":100,"name":"$1000 Cash","startAvailable":100,"tickets":{"partList":["8K61A",10,"8K62B",8,"8K63C",14,"8K64D",0],"required":4,"winner":"8K64D"},"value":1000,"viewId":"p28"},{"_id":"589fb0210aee383e8a17aa7f","available":100,"name":"$1000 Grocery Card","startAvialable":100,"tickets":{"partList":["8L57A",0,"8L58B",6,"8L59C",5,"8L60D",7],"required":4,"winner":"8L57A"},"value":1000,"viewId":"p29"},{"_id":"589fb1fb0aee383e8a17aa82","available":100,"name":"Laptop Computer","startAvailable":100,"tickets":{"partList":["8M53A",6,"8M54B",0,"8M55C",6,"8M56D",9],"required":4,"winner":"8M54B"},"value":1000,"viewId":"p30"}];

  global.document = dom.window.document;

  it("Sets the title and winning piece text of each card", () => {
    //modules required for configureCardCollectionView are mocked at top of this file. Title is stored in DOM elements with and id equal to 't(n)'. Winner text is stored in DOM elements with an id equal to 'w(n)'
    configureCardCollectionView(objArray);
    objArray.forEach((item) => {
      expect(document.getElementById(`t${item.viewId.substr(1)}`).textContent).to.equal(item.name);
      expect(document.getElementById(`w${item.viewId.substr(1)}`).textContent).to.equal('winner text');
    });
  });
});