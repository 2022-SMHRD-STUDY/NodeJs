1. 모듈
    $ npm install <package> :  지역 설치 - 해당 프로젝트 안에서만 사용 가능
    $ npm install -g <package> : 전역 설치
        저장경로 = C:\Users\tkroa\AppData\Roaming\npm\node_modules

    $ npm init : pakage.json 세팅

    1-1. 모듈 사용법 require()
    # 모듈을 가져올 때 사용함
    # 내장 모듈은 require('모듈명')으로 사용가능

    1-2. 모듈 설치시 npm 명령어 사용
    # https://www.npmjs.com

    1-3. require('http')
    # http는 설치시에 자동으로 내장되어있는 모듈
    # 예시 : var http = require('http'); 
    # 나중에는 'Express' 라는 모듈을 많이 사용

    1-4. require('url')
    # Parsing : 어떤 data를 원하는 form으로 만들어 내는 것
    # true : url 객체의 query 속성을 객체 형식으로 가져온다.
    # false : url 객체의 query 속성을 문자열 형식으로 가져온다.

2. 오라클 연동 
    $ npm install oracledb
    2-1. 서비스 상태 확인하기
    # window -> 서비스(service) 검색 -> oracle관련 서비스 시작
    # 수동설정으로 바꾸기

    2-2. 환경 변수 확인하기
    # window -> 시스템 환경변수편집 -> 환경변수 -> 시스템 변수에서
        시스템 변수이름 : ORACLE_HOME
        변수값         : C:\oraclexe\app\oracle\product\11.2.0\server

    2-3. 마지막으로 db 관리툴에서 연결되는지 확인
    # SERVICE -> OracleXETNSListner
    # 꺼져있으면 접속 불가

3. Nodemon
    # 서버 새로고침해주는거..
    1.npm install -g nodemon // 전역설치
    2.npm npm install --save-dev nodemon //개발환경에서만 사용

    // package.json
    // 서버시작파일 설정 여기선 index.js
    "scripts": {
        "start": "node ./index.js",
        "debug": "nodemon --inspect ./index.js"
    }
    
    //.vscode/launch.json
    {
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Node: Nodemon",
            "processId": "${command:PickProcess}",
            "restart": true,
            "protocol": "inspector",
            },
        ]
    }

    에러1 -[ nodemon : 이 시스템에서 스크립트를 실행할 수 없으므로.. ]
    해결법 : https://hellcoding.tistory.com/entry/VSCode-%EC%98%A4%EB%A5%98-%EC%9D%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C









