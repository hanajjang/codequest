export const missions = [
  {
    id: 'c_basics_intro',
    title: '🚀 C언어 첫걸음: 안녕하세요, 코드',
    category: 'C 기초',
    difficulty: 1,
    language: 'C',
    icon: '📖',
    description: 'C언어의 가장 기초적인 출력 명령어를 배웁니다',
    learningOutcomes: ['printf() 함수 이해', '기본 프로그램 구조', '컴파일과 실행 개념'],
    estimatedTime: '15분',
    unlockCondition: null,
    steps: [
      {
        step: 1,
        title: '첫 프로그램 작성',
        description: '화면에 \'안녕하세요, CodeQuest!\'를 출력하는 C 프로그램을 작성하세요.',
        hint: 'printf() 함수를 사용하고, 문자열을 큰따옴표로 감싸세요.',
        template: '#include <stdio.h>\n\nint main() {\n    // 여기에 printf 문을 작성하세요\n    \n    return 0;\n}',
        expectedOutput: '안녕하세요, CodeQuest!',
        solution: '#include <stdio.h>\n\nint main() {\n    printf("안녕하세요, CodeQuest!");\n    return 0;\n}',
        concepts: ['printf()', 'main()']
      },
      {
        step: 2,
        title: '여러 줄 출력하기',
        description: '3줄에 걸쳐 메시지를 출력하세요.',
        hint: '각 printf() 뒤에 새로운 printf()를 추가하거나, \\n을 사용하세요.',
        template: '#include <stdio.h>\n\nint main() {\n    // 3줄을 출력하는 코드를 작성하세요\n    \n    return 0;\n}',
        expectedOutput: '첫 번째 라인\n두 번째 라인\n세 번째 라인',
        solution: '#include <stdio.h>\n\nint main() {\n    printf("첫 번째 라인\\n");\n    printf("두 번째 라인\\n");\n    printf("세 번째 라인\\n");\n    return 0;\n}',
        concepts: ['printf()', 'newline character']
      },
      {
        step: 3,
        title: '변수와 함께 출력하기',
        description: '정수 변수 age에 25를 저장하고, \'나의 나이는 25입니다\'라고 출력하세요.',
        hint: '정수형 변수는 int로 선언하고, printf에서 %d를 사용하여 정수를 출력합니다.',
        template: '#include <stdio.h>\n\nint main() {\n    int age = /* 여기에 값 입력 */;\n    // 나이를 출력하는 printf 문을 작성하세요\n    \n    return 0;\n}',
        expectedOutput: '나의 나이는 25입니다',
        solution: '#include <stdio.h>\n\nint main() {\n    int age = 25;\n    printf("나의 나이는 %d입니다", age);\n    return 0;\n}',
        concepts: ['int type', '%d format specifier', '변수']
      }
    ],
    rewards: { xp: 100, badge: '🌱 C언어 새싹' }
  }
]
