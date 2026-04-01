export const missions = [
  {
    id: 'c_basics_intro',
    title: '🚀 C언어 첫걸음: Hello World',
    category: 'C 기초',
    difficulty: 1,
    language: 'C',
    icon: '📖',
    description: 'C언어의 기본 출력 명령어를 배웁니다',
    learningOutcomes: ['printf() 함수 이해', '기본 프로그램 구조', '컴파일 개념'],
    estimatedTime: 15,
    unlockCondition: null,
    steps: [
      {
        step: 1,
        title: '첫 프로그램 작성',
        description: '화면에 "Hello World"를 출력하는 프로그램을 작성하세요.',
        hint: 'printf() 함수를 사용하세요.',
        template: '#include <stdio.h>\n\nint main() {\n    // 여기에 printf 작성\n    return 0;\n}',
        expectedOutput: 'Hello World',
        solution: '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}',
        concepts: ['printf()', 'main()']
      }
    ],
    rewards: { xp: 100, badge: '🌱 C언어 첫걸음' }
  },
  {
    id: 'c_variables',
    title: '📝 변수와 자료형',
    category: 'C 기초',
    difficulty: 1,
    language: 'C',
    icon: '🔢',
    description: '변수 선언과 다양한 자료형을 배웁니다',
    learningOutcomes: ['변수 선언', 'int/float/char 이해', '메모리 개념'],
    estimatedTime: 20,
    unlockCondition: 'c_basics_intro',
    steps: [
      {
        step: 1,
        title: '정수 변수 선언',
        description: '나이를 저장하는 정수 변수를 만들고 출력하세요.',
        hint: 'int age = 25; printf("%d", age);',
        template: '#include <stdio.h>\n\nint main() {\n    // 변수 선언 후 출력\n    return 0;\n}',
        expectedOutput: '25',
        solution: '#include <stdio.h>\n\nint main() {\n    int age = 25;\n    printf("%d", age);\n    return 0;\n}',
        concepts: ['int', '변수 선언']
      }
    ],
    rewards: { xp: 150, badge: '🔢 변수 마스터' }
  },
  {
    id: 'c_conditionals',
    title: '🔀 조건문 (if/else)',
    category: 'C 기초',
    difficulty: 2,
    language: 'C',
    icon: '❓',
    description: '조건에 따른 코드 실행을 배웁니다',
    learningOutcomes: ['if 문법', 'else 구조', '논리 연산자'],
    estimatedTime: 25,
    unlockCondition: 'c_variables',
    steps: [
      {
        step: 1,
        title: '간단한 if문',
        description: '숫자가 10보다 크면 "크다", 아니면 "작다"를 출력하세요.',
        hint: 'if (num > 10) { printf("크다"); }',
        template: '#include <stdio.h>\n\nint main() {\n    int num = 15;\n    // if/else 작성\n    return 0;\n}',
        expectedOutput: '크다',
        solution: '#include <stdio.h>\n\nint main() {\n    int num = 15;\n    if (num > 10) {\n        printf("크다");\n    } else {\n        printf("작다");\n    }\n    return 0;\n}',
        concepts: ['if', 'else', '비교 연산자']
      }
    ],
    rewards: { xp: 200, badge: '🔀 조건문 전문가' }
  },
  {
    id: 'c_loops',
    title: '🔁 반복문 (for/while)',
    category: 'C 기초',
    difficulty: 2,
    language: 'C',
    icon: '♻️',
    description: '반복문으로 코드를 효율적으로 작성합니다',
    learningOutcomes: ['for 문법', 'while 구조', '루프 제어'],
    estimatedTime: 30,
    unlockCondition: 'c_conditionals',
    steps: [
      {
        step: 1,
        title: '1부터 5까지 출력',
        description: 'for 문을 사용하여 1부터 5까지 출력하세요.',
        hint: 'for (int i = 1; i <= 5; i++)',
        template: '#include <stdio.h>\n\nint main() {\n    // for 루프 작성\n    return 0;\n}',
        expectedOutput: '1\n2\n3\n4\n5',
        solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}',
        concepts: ['for', '루프 변수', '조건식']
      }
    ],
    rewards: { xp: 250, badge: '♻️ 반복문 마스터' }
  },
  {
    id: 'c_arrays',
    title: '📚 배열',
    category: 'C 중급',
    difficulty: 2,
    language: 'C',
    icon: '📊',
    description: '배열을 사용한 데이터 관리를 배웁니다',
    learningOutcomes: ['배열 선언', '배열 인덱싱', '배열과 반복문'],
    estimatedTime: 35,
    unlockCondition: 'c_loops',
    steps: [
      {
        step: 1,
        title: '배열 생성 및 출력',
        description: '5개의 정수를 배열에 저장하고 출력하세요.',
        hint: 'int arr[] = {1, 2, 3, 4, 5};',
        template: '#include <stdio.h>\n\nint main() {\n    // 배열 선언 후 출력\n    return 0;\n}',
        expectedOutput: '1\n2\n3\n4\n5',
        solution: '#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++) {\n        printf("%d\\n", arr[i]);\n    }\n    return 0;\n}',
        concepts: ['배열 선언', '배열 인덱싱', '배열 길이']
      }
    ],
    rewards: { xp: 300, badge: '📚 배열 전문가' }
  },
  {
    id: 'c_functions',
    title: '⚙️ 함수',
    category: 'C 중급',
    difficulty: 3,
    language: 'C',
    icon: '🔧',
    description: '함수를 정의하고 사용하는 방법을 배웁니다',
    learningOutcomes: ['함수 선언', '매개변수', '반환값'],
    estimatedTime: 40,
    unlockCondition: 'c_arrays',
    steps: [
      {
        step: 1,
        title: '함수 만들기',
        description: '두 수를 더하는 함수를 만들고 호출하세요.',
        hint: 'int add(int a, int b) { return a + b; }',
        template: '#include <stdio.h>\n\n// 함수 선언\n\nint main() {\n    // 함수 호출\n    return 0;\n}',
        expectedOutput: '30',
        solution: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(10, 20);\n    printf("%d", result);\n    return 0;\n}',
        concepts: ['함수 선언', '매개변수', '반환값']
      }
    ],
    rewards: { xp: 350, badge: '⚙️ 함수 마스터' }
  },
  {
    id: 'python_basics',
    title: '🐍 Python 기초',
    category: 'Python 기초',
    difficulty: 1,
    language: 'Python',
    icon: '🐍',
    description: 'Python으로 프로그래밍을 시작합니다',
    learningOutcomes: ['print() 함수', '변수', '기본 문법'],
    estimatedTime: 20,
    unlockCondition: 'c_functions',
    steps: [
      {
        step: 1,
        title: 'Hello Python',
        description: 'Python으로 "Hello Python"을 출력하세요.',
        hint: 'print("Hello Python")',
        template: '# 여기에 print 작성\n',
        expectedOutput: 'Hello Python',
        solution: 'print("Hello Python")',
        concepts: ['print()']
      }
    ],
    rewards: { xp: 200, badge: '🐍 Python 시작' }
  },
  {
    id: 'js_basics',
    title: '⚡ JavaScript 기초',
    category: 'JavaScript 기초',
    difficulty: 1,
    language: 'JavaScript',
    icon: '⚡',
    description: 'JavaScript 기본 문법을 배웁니다',
    learningOutcomes: ['console.log()', '변수', '문자열'],
    estimatedTime: 20,
    unlockCondition: 'c_functions',
    steps: [
      {
        step: 1,
        title: 'Hello JavaScript',
        description: 'JavaScript로 "Hello JavaScript"를 출력하세요.',
        hint: 'console.log("Hello JavaScript")',
        template: '// 여기에 console.log 작성\n',
        expectedOutput: 'Hello JavaScript',
        solution: 'console.log("Hello JavaScript")',
        concepts: ['console.log()']
      }
    ],
    rewards: { xp: 200, badge: '⚡ JavaScript 시작' }
  }
]
