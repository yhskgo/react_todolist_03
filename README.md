# 성능개선 최적화

* 리액트의 연산 최적화 : 메모제이션 기법 적용
* 특정 입력 결과를 계산 메모리에 저장, 요청에 따라 빠르게 응답하는 기술
* Dynamic Programming(DP)

# useMemo 메모제이션 기법

* const value = useMemo(callback, deps); // callback:콜백함수, deps:의존성배열
* 함수 useMemo를 호출하고 2개의 인수로 콜백함수와 의존성배열을 전달
* 호출된 useMemo는 의존성 배열이 담긴 값이 바뀌면 콜백 함수를 다시 실행하고 결과값을 반환
* const value = useMemo(() => {
*    return count * count;
* }, [count])

* 불필요 함수 재호출 방지

# 불필요한 컴포넌트 리렌더링 방지
    // React.memo를 이용한 메모제이션기법
    // 고차 컴포넌트와 횡단 관심사
    // ** 고차 컴포넌트 HOC(High Order Component)
    // 컴포넌트의 기능을 다시 사용하기 위한 리액트 고급 기술
    // 고차컴포넌트 : 인수로 전달된 컴포넌트를 새로운 컴포넌트로 반환하는 함수
    // 컴포넌트에 어떤 기능을 추가해 반환하는 "강화된 컴포넌트"
    // using withFunc -> EnhancedComp return : const EnhanceComp = withFunc(Comp);
    // ** 횡단관심사(Cross-Cutting Concerns)
    // HOC를 이용하면 횡단관심사를 해결
    // HOC : 프로그래밍에서 비지니스 로직과 구분되는 공토 기능을 지칭
    // Business logic : 해당 컴포넌트가 존재하는 핵심기능을 표현할 때 사용
    // const CompA = () => {
    //     console.log("Calling Component");
    //     return <div>CompA</div>;
    // };
    // const CompB = () => {
    //     console.log("Calling Component");
    //     return <div>CompB</div>;
    // };
    //==> Not Business logic, is HOC.
    // Cross Cugging Concerns : 주로 로깅, 데이터베이스 접속, 인가 등 여러곳에서 호출해 사용하는 코드
    // function withLifecycleLogging(WrappedComponent) {
    //     return (props) => {
    //         useEffect(() => {
    //             console.log("Mount");
    //             return () => console.log("Unmount");
    //         }, []);
    //         useEffect(() => {
    //             console.log("Update");
    //         });
    //         return <WrappedComponent {...props} />;
    //     };
    // }

    // const LifecycleLoggingComponent = withLifecycleLogging(Comp);
    // Comp: 래핑된 컴포넌트
    // LifecycleLoggingComponent: 강화된 컴포넌트 
    // withLifecycleLogging: 고차 컴포넌트

    // ** React.memo usage
    // const memoizedComp = React.memo(Comp);
    // const CompA = React.memo(()=>{
    //     console.log("Calling component...");
    //     return <div>CompA</div>;
    // });
    // React.memo는 Props의 변경여부를 기존으로 컴포넌트의 리렌더 여부를 결정
    // 만약 Props로 전달되는 값이 많을 때는 다름과 같이 판별함수를 인수로 전달 Props의 특정값으로 리랜더 여부를 판단 가능
    // const Comp = ({a, b, c}) => {
    //     console.log("Component calling...");
    //     return <div>Comp</div>;
    // };

    // ** 판별함수, 두개의 매개변수 prevProps 이전의 Props값 nextProps 새로게 바뀐 Props값이 저장
    // 판별함수가 true 리턴 > 리렌더되지 않고 false이면 리렌더
    // function areEqual(prevProps, nextProps) {
    //     if(prevProps.a === nextProps.a) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    // ** Comp 컴포넌트를 메모이제이션하기 위해 React.memo를 호출하고 인수를 전달
    // 두번째 인수로 판별함수areEqual을 전달, 그 결과로 반환되는 MemoizedComp는 던달되는 Props 값 중 a가 변경될 때만 리렌더 됨
    // const MemoizedComp = React.memo(Comp, areEqual);

# useReducer를 이용 컴포넌트에서 상태 변화 코드를 쉽게 분리
# 상태변화 코드 분리를 위한 useReducer 사용방법

# 컴포넌트 기능 구현, 컴포넌트별 기능 구현 목록

* App 컴포넌트: 할 일 데이터 관리하기
* Header 컨포넌트: 오늘의 날짜 표시
* TodoEiditor 컴포넌트: 새로운 할 일 아이템 생성
* TodoList 컴포넌트: 검색에 따라 필터링된 할 일 아템 렌더링
* TodoItem 컴포넌트: 할 일 아이템의 수정 삭제

# CRUD

* Create: Add Todo Item
* Read: Rendering Todo Item
* Update: Update Todo Item
* Delete: Delete Todo Item

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
