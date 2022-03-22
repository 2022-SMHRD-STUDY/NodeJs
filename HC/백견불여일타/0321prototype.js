//프로토타입 : 객체 지향 프로그래밍을 할 수 있게 도와주는 것

function func() { };
console.log(func.prototype); // func {}

func.prototype.name = 'gildong';
console.log(func.prototype); //func { name: 'gildong' }

//객체안에 __proto__라는 프로퍼티가 있고 이 프로퍼티를 만들어낸 원형인 '프로토타입 객체'를
//참조하는 숨겨진 링크가 있는데 이것이 프로토타입


//프로토타입과 상속
const animal = {
    leg: 4,
    tail: 1,
    say(){
        console.log('I hava 4 legs 1 tail');
    }
}

const dog = {
    sound : 'wang'
}
const cat = {
    sound : 'yaong'
}

//animal 객체 상속!
dog.__proto__ = animal;
cat.__proto__ = animal;

console.log(dog.__proto__);
console.log(dog.leg); // 4

//=======================================
//Prototype Chaning
const animal1 = {
    leg: 4,
    tail: 1,
    say(){
        console.log('I hava 4 legs 1 tail');
    }
}

const dog1 = {
    sound : 'wang',
    happy: true
}
dog1.__proto__ = animal1; //animal1 상속

const cat1 = {
    sound : 'yaong'
}
cat1.__proto__ = dog1; //dog1 상속

console.log(cat1.happy); //true
console.log(cat1.leg); //4
//=======================================
function Animal() {}

Animal.prototype.leg = 4;
Animal.prototype.tail = 1;

const dog2 = new Animal();
const cat2 = new Animal();

//function, new를 통해 클래스 흉내낼 수 있음
//객체.prototype.속성키 = 속성값

