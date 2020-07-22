<script>

export const STD7DICE = [
     { id: 0, name: "D4", numFaces: 4, faceLabels: [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]], faceValues: ['', 0, 1, 2, 3, 4],  scale: 1.2,  invertUpside: true, operations: {addition:'+', highlight: [4]}},
     { id: 1, name: "D6", numFaces: 6, faceLabels: [' ', '0', '1', '2', '3', '4', '5', '6'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6], scale: 1.0,  invertUpside: false, operations: {addition:'+', highlight: [6]}},
     { id: 1, name: "D8", numFaces: 8, faceLabels: [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8], scale: 1.0,  invertUpside: false, operations: {addition:'+', highlight: [8]}},
     { id: 1, name: "D10", numFaces: 10, faceLabels: [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], scale: 0.9,  invertUpside: false, operations: {addition:'+', highlight: [10]}},
     { id: 1, name: "D12", numFaces: 12, faceLabels: [' ','0','1','2','3','4','5','6','7','8','9','10','11','12'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scale: 0.9,  invertUpside: false, operations: {addition:'+', highlight: [12]}},
     { id: 1, name: "D20", numFaces: 20, faceLabels: [' ','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14', '15', '16','17','18','19','20' ], faceValues: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], scale: 1.0,  invertUpside: true, operations: {addition:'+', highlight: [20]}},
     { id: 1, name: "D100", numFaces: 10, faceLabels: [' ', '00', '10', '20', '30', '40', '50', '60', '70', '80', '90', '00',], faceValues: ['', 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], scale: 0.9,  invertUpside: true, operations: {addition:'+', highlight: [0]}}
]

export const BODYPARTSDIE = [
     { id: 1, name: "BODYPART", numFaces: 12, faceLabels: [' ','0','HEAD','RIGHT ARM','LEFT ARM','RIGHT HAND','LEFT HAND','FULL BODY','STOMACH','LEFT LEG','RIGHT LEG','CHEST','LEFT FOOT','RIGHT FOOT'], faceValues: ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], faceColor: "#ffffff", scale: 1.5,  invertUpside: false, operations: {}}
]

export const FATEDIE = [
     { id: 0, name: "FATE", numFaces: 6, faceLabels: [' ','0','+','-','+','-',' ',' '], faceValues: ['', 0, 1, -1, 1, -1, 0, 0,],  scale: 1.0,  invertUpside: false, operations: {addition:'+', highlight: [0]}}
]

export const TORDICE = [
     { id: 0, name: "DIE", numFaces: 6, faceLabels: [' ','0','1','2','3','4','5','6'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6,],scale: 1.0,  invertUpside: false, operations: {addition:'+', highlight: [4,5,6]}},
     { id: 1, name: "FEATDIE", numFaces: 12, faceLabels: [' ','0','1','2','3','4','5','6','7','8','9','10','S','G'], faceValues: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scale: 1.0,  invertUpside: false, operations: {addition:'+', highlight: [11,12]}}
]


export const DICE_TEXTURES = [ 
    {id: 0, name: "Dice #1", img: 'dice/img/dice00.jpg', setimg: 'dice/img/set-00.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 1, name: "Dice #2", img: 'dice/img/dice01.jpg', setimg: 'dice/img/set-01.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 2, name: "Dice #3", img: 'dice/img/dice02.jpg', setimg: 'dice/img/set-02.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 1, name: "Dice #4", img: 'dice/img/dice03.jpg', setimg: 'dice/img/set-03.jpg', fontColor: "#000000", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 1, name: "Dice #5", img: 'dice/img/dice04.jpg', setimg: 'dice/img/set-04.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 1, name: "Dice #6", img: 'dice/img/dice05.jpg', setimg: 'dice/img/set-05.jpg', fontColor: "#000000", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},
    {id: 1, name: "Dice #7", img: 'dice/img/dice06.jpg', setimg: 'dice/img/set-06.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table02.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table00.mp3'}},    
    {id: 1, name: "Dice #8", img: 'dice/img/dice07.jpg', setimg: 'dice/img/set-07.jpg', fontColor: "#ffffff", chamfer: 0.9, opacity: 1.0, dieFriction: 0.1, dieRestitution: 0.95, barrierFriction: 0.0, barrierRestitution: 1.0, floorFriction: 0.5, floorRestitution: 0.4, density: 300, inertia: 5, textMargin: 1.5, font: "Arial", soundPerFloor: {metal:'table/snd/table01.mp3', wood: 'table/snd/table01.mp3', synth: 'table/snd/table01.mp3'}},   
    ]

// die mass is a die scale x texture density


// addition (face values are computed as part of a global addition operation)
// selection (face values are computed to make the die count)
// highlight (face values are computed to make the die stand out)


</script>
