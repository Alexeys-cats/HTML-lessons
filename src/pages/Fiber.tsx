import { useState, useEffect } from 'react';
import ReacktImg from '../../public/ReacktImg.png';

// Компонент для демонстрации Fiber
const FiberDemo = () => {
  const [fiberNodes, setFiberNodes] = useState([
    {
      id: 1,
      type: 'div',
      state: 'completed',
      priority: 'normal',
      workInProgress: false,
    },
    {
      id: 2,
      type: 'h1',
      state: 'completed',
      priority: 'normal',
      workInProgress: false,
    },
    {
      id: 3,
      type: 'p',
      state: 'completed',
      priority: 'normal',
      workInProgress: false,
    },
    {
      id: 4,
      type: 'span',
      state: 'pending',
      priority: 'low',
      workInProgress: false,
    },
  ]);
  const [currentWork, setCurrentWork] = useState<number | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<string[]>([]);
  const [batchHistory, setBatchHistory] = useState<
    Array<{ batch: string[]; priority: string; completed: number }>
  >([]);

  const startWork = () => {
    setIsWorking(true);
    setBatchHistory([]);
    setCurrentBatch([]);

    // Группируем задачи по приоритетам
    const pendingNodes = fiberNodes.filter((node) => node.state === 'pending');
    const groupedByPriority = {
      immediate: pendingNodes.filter((n) => n.priority === 'immediate'),
      userBlocking: pendingNodes.filter((n) => n.priority === 'userBlocking'),
      high: pendingNodes.filter((n) => n.priority === 'high'),
      normal: pendingNodes.filter((n) => n.priority === 'normal'),
      low: pendingNodes.filter((n) => n.priority === 'low'),
      idle: pendingNodes.filter((n) => n.priority === 'idle'),
    };

    const processBatch = (
      priority: string,
      nodes: Array<{
        id: number;
        type: string;
        state: string;
        priority: string;
        workInProgress: boolean;
      }>
    ) => {
      if (nodes.length === 0) return;

      setCurrentBatch(nodes.map((n) => `${n.type} (ID: ${n.id})`));

      // Обрабатываем все узлы в батче
      let completedCount = 0;
      nodes.forEach((node, index) => {
        setTimeout(() => {
          setCurrentWork(node.id);
          setFiberNodes((prevNodes) =>
            prevNodes.map((n) =>
              n.id === node.id
                ? { ...n, state: 'working', workInProgress: true }
                : n
            )
          );

          // Завершаем работу над узлом
          setTimeout(() => {
            setFiberNodes((prevNodes) =>
              prevNodes.map((n) =>
                n.id === node.id
                  ? { ...n, state: 'completed', workInProgress: false }
                  : n
              )
            );
            completedCount++;

            // Если это последний узел в батче
            if (completedCount === nodes.length) {
              setBatchHistory((prev) => [
                ...prev,
                {
                  batch: nodes.map((n) => `${n.type} (ID: ${n.id})`),
                  priority,
                  completed: nodes.length,
                },
              ]);
              setCurrentBatch([]);
              setCurrentWork(null);

              // Переходим к следующему приоритету
              const priorities = [
                'immediate',
                'userBlocking',
                'high',
                'normal',
                'low',
                'idle',
              ];
              const currentIndex = priorities.indexOf(priority);
              const nextPriority = priorities[currentIndex + 1];

              if (
                nextPriority &&
                groupedByPriority[
                  nextPriority as keyof typeof groupedByPriority
                ].length > 0
              ) {
                setTimeout(
                  () =>
                    processBatch(
                      nextPriority,
                      groupedByPriority[
                        nextPriority as keyof typeof groupedByPriority
                      ]
                    ),
                  500
                );
              } else {
                setIsWorking(false);
              }
            }
          }, 800);
        }, index * 300);
      });
    };

    // Начинаем с самого высокого приоритета
    const priorities = [
      'immediate',
      'userBlocking',
      'high',
      'normal',
      'low',
      'idle',
    ];
    for (const priority of priorities) {
      const nodes =
        groupedByPriority[priority as keyof typeof groupedByPriority];
      if (nodes.length > 0) {
        processBatch(priority, nodes);
        break;
      }
    }
  };

  const addHighPriorityWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'button',
        state: 'pending',
        priority: 'high',
        workInProgress: false,
      },
    ]);
  };

  const addLowPriorityWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'div',
        state: 'pending',
        priority: 'low',
        workInProgress: false,
      },
    ]);
  };

  const addImmediateWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'input',
        state: 'pending',
        priority: 'immediate',
        workInProgress: false,
      },
    ]);
  };

  const addUserBlockingWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'button',
        state: 'pending',
        priority: 'userBlocking',
        workInProgress: false,
      },
    ]);
  };

  const addNormalWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'div',
        state: 'pending',
        priority: 'normal',
        workInProgress: false,
      },
    ]);
  };

  const addIdleWork = () => {
    const newId = Math.max(...fiberNodes.map((n) => n.id)) + 1;
    setFiberNodes((prev) => [
      ...prev,
      {
        id: newId,
        type: 'span',
        state: 'pending',
        priority: 'idle',
        workInProgress: false,
      },
    ]);
  };

  const resetWork = () => {
    setFiberNodes([
      {
        id: 1,
        type: 'div',
        state: 'completed',
        priority: 'normal',
        workInProgress: false,
      },
      {
        id: 2,
        type: 'h1',
        state: 'completed',
        priority: 'normal',
        workInProgress: false,
      },
      {
        id: 3,
        type: 'p',
        state: 'completed',
        priority: 'normal',
        workInProgress: false,
      },
      {
        id: 4,
        type: 'span',
        state: 'pending',
        priority: 'low',
        workInProgress: false,
      },
    ]);
    setCurrentWork(null);
    setIsWorking(false);
    setCurrentBatch([]);
    setBatchHistory([]);
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'working':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'text-red-700 bg-red-100';
      case 'userBlocking':
        return 'text-orange-600 bg-orange-100';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'normal':
        return 'text-blue-600 bg-blue-50';
      case 'low':
        return 'text-gray-600 bg-gray-50';
      case 'idle':
        return 'text-gray-500 bg-gray-25';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'Immediate';
      case 'userBlocking':
        return 'UserBlocking';
      case 'high':
        return 'High';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Low';
      case 'idle':
        return 'Idle';
      default:
        return priority;
    }
  };

  const getBatchColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'bg-red-100 border-red-300';
      case 'userBlocking':
        return 'bg-orange-100 border-orange-300';
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'normal':
        return 'bg-blue-50 border-blue-200';
      case 'low':
        return 'bg-gray-50 border-gray-200';
      case 'idle':
        return 'bg-gray-25 border-gray-100';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
          Интерактивная демонстрация Fiber с батчингом
        </h3>

        <div className="space-y-4">
          {/* Критические приоритеты */}
          <div>
            <h4 className="font-semibold text-red-600 mb-2">
              🚨 Критические приоритеты:
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addImmediateWork}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Immediate (1)
              </button>
              <button
                onClick={addUserBlockingWork}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                UserBlocking (2)
              </button>
            </div>
          </div>

          {/* Обычные приоритеты */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              📋 Обычные приоритеты:
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addHighPriorityWork}
                className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                High (3)
              </button>
              <button
                onClick={addNormalWork}
                className="bg-[#4ECDC4] hover:bg-[#45B7AA] text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Normal (4)
              </button>
              <button
                onClick={addLowPriorityWork}
                className="bg-[#FF9F43] hover:bg-[#F39C12] text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Low (5)
              </button>
            </div>
          </div>

          {/* Фоновые приоритеты */}
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">
              🌙 Фоновые приоритеты:
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addIdleWork}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Idle (6)
              </button>
            </div>
          </div>

          {/* Управление */}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={startWork}
                disabled={isWorking}
                className="bg-[#00DBDB] hover:bg-[#00B8B8] disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isWorking ? 'Работаем...' : 'Начать работу'}
              </button>
              <button
                onClick={resetWork}
                className="bg-[#778CA3] hover:bg-[#4B6584] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Сбросить
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-[#FFE66D] hover:bg-[#FFD93D] text-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
              >
                {showDetails ? 'Скрыть' : 'Показать'} детали
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="font-semibold text-[#2D2D2D] mb-3">Fiber узлы:</h4>
            <div className="space-y-2">
              {fiberNodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-3 rounded-lg border-2 ${
                    currentWork === node.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{node.type}</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${getPriorityColor(node.priority)}`}
                      >
                        {getPriorityLabel(node.priority)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getStateColor(node.state)}`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {node.state}
                      </span>
                    </div>
                  </div>
                  {showDetails && (
                    <div className="mt-2 text-xs text-gray-500">
                      <div>ID: {node.id}</div>
                      <div>
                        Work in progress: {node.workInProgress ? 'Yes' : 'No'}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-3">
                Текущий батч:
              </h4>
              {currentBatch.length > 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm font-semibold text-blue-700 mb-2">
                    🔄 Обрабатываем батч ({currentBatch.length} задач):
                  </div>
                  <div className="space-y-1">
                    {currentBatch.map((task, index) => (
                      <div key={index} className="text-sm text-blue-600">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-500 text-sm">
                  Нет активного батча
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-3">
                История батчей:
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {batchHistory.length > 0 ? (
                  batchHistory.map((batch, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-2 ${getBatchColor(batch.priority)}`}
                    >
                      <div className="text-xs font-semibold text-gray-700 mb-1">
                        ✅ {getPriorityLabel(batch.priority)} батч (
                        {batch.completed} задач)
                      </div>
                      <div className="text-xs text-gray-600">
                        {batch.batch.join(', ')}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">История пуста</div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-3">Состояние:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2">// Fiber Work Loop с батчингом</div>
                <div className="text-blue-400">
                  {isWorking ? (
                    <>
                      <div>🔄 Обрабатываем батч приоритета</div>
                      <div>📦 Группируем задачи по приоритетам</div>
                      <div>⚡ Можем прервать между батчами</div>
                      <div>
                        📊 Приоритеты: Immediate &gt; UserBlocking &gt; High
                        &gt; Normal &gt; Low &gt; Idle
                      </div>
                    </>
                  ) : (
                    <>
                      <div>✅ Все батчи обработаны</div>
                      <div>🎯 Готов к новым задачам</div>
                      <div>⚡ Мгновенный отклик на пользовательский ввод</div>
                    </>
                  )}
                </div>
                <div className="mt-2 text-yellow-400">
                  // Батчинг позволяет группировать задачи и прерывать работу
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент для объяснения Fiber архитектуры
const FiberExplanation = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: '1. Fiber Node',
      description:
        'Каждый элемент React представлен как Fiber узел с полной информацией',
      code: `interface Fiber {
  type: any;           // Тип элемента
  key: string;         // Уникальный ключ
  stateNode: any;      // Ссылка на DOM узел
  return: Fiber;       // Родительский узел
  child: Fiber;        // Первый дочерний узел
  sibling: Fiber;      // Следующий братский узел
  alternate: Fiber;    // Альтернативный узел
  effectTag: number;   // Тип эффекта
  expirationTime: number; // Приоритет
}`,
    },
    {
      title: '2. Work Loop',
      description: 'Fiber может прерывать и возобновлять работу',
      code: `function workLoop() {
  while (workInProgress !== null) {
    // Проверяем, не нужно ли прервать работу
    if (shouldYield()) {
      // Возвращаем управление браузеру
      return;
    }
    
    // Обрабатываем текущий узел
    performUnitOfWork(workInProgress);
  }
}`,
    },
    {
      title: '3. Приоритеты',
      description: 'Разные типы обновлений имеют разные приоритеты',
      code: `const Priorities = {
  Immediate: 1,    // Синхронные обновления
  UserBlocking: 2, // Пользовательский ввод
  Normal: 3,       // Обычные обновления
  Low: 4,          // Фоновые задачи
  Idle: 5          // Неважные задачи
};`,
    },
    {
      title: '4. Прерывания',
      description:
        'Fiber может прервать работу для обработки высокоприоритетных задач',
      code: `// Пользователь кликнул кнопку
// Fiber прерывает текущую работу
// Обрабатывает клик немедленно
// Возвращается к прерванной работе

// Это делает React более отзывчивым!`,
    },
  ];

  //   const nextStep = () => {
  //     setIsAnimating(true);
  //     setTimeout(() => {
  //       setStep((prev) => (prev + 1) % steps.length);
  //       setIsAnimating(false);
  //     }, 300);
  //   };

  // автоплей если нужно
  // useEffect(() => {
  //   const interval = setInterval(nextStep, 7000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
        Архитектура Fiber
      </h3>

      <div
        className={`transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
      >
        <h4 className="font-semibold text-[#00DBDB] mb-2">
          {steps[step].title}
        </h4>
        <p className="text-[#2D2D2D] mb-4">{steps[step].description}</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{steps[step].code}</pre>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === step ? 'bg-[#00DBDB]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const Fiber = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full bg-gradient-to-r from-[#AEAEAE]/80 via-[#AEAEAE]/40 to-transparent rounded-xl py-8 px-6 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
              React <span className="text-[#00DBDB]">Fiber</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#2D2D2D]">
              Изучите новую архитектуру React, которая позволяет прерывать и
              возобновлять работу для обеспечения отзывчивости приложения
            </p>
            <div className="mt-6">
              <a
                href="/#/reconciliation"
                className="inline-block bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-6 py-3 rounded-lg transition-colors"
              >
                ← Вернуться к Reconciliation
              </a>
            </div>
          </div>

          {/* Floating React logo */}
          <div className="hidden xl:block absolute top-8 right-8 animate-bounce">
            <img
              src={ReacktImg}
              alt="React"
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <FiberDemo />
            <FiberExplanation />

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Прерываемость
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Fiber может прервать работу в любой момент и возобновить её
                  позже, не теряя прогресс
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Приоритеты
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Разные типы обновлений имеют разные приоритеты, что позволяет
                  React быть более отзывчивым
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Инкрементальность
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Работа выполняется по частям, что позволяет браузеру
                  обрабатывать пользовательский ввод между частями
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Преимущества Fiber
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#00DBDB] mb-2">
                    🚀 Производительность:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Мгновенный отклик на пользовательский ввод</li>
                    <li>• Плавная анимация без задержек</li>
                    <li>• Эффективное использование CPU</li>
                    <li>• Лучшая обработка больших списков</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4ECDC4] mb-2">
                    🎯 Пользовательский опыт:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Отсутствие блокировки интерфейса</li>
                    <li>• Приоритизация важных обновлений</li>
                    <li>• Предсказуемое поведение</li>
                    <li>• Лучшая доступность</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Сравнение: Stack vs Fiber
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#FF6B6B] mb-2">
                    ❌ Stack (старая архитектура):
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Синхронная работа</li>
                    <li>• Блокировка интерфейса</li>
                    <li>• Нет приоритетов</li>
                    <li>• Плохая отзывчивость</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#00DBDB] mb-2">
                    ✅ Fiber (новая архитектура):
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Асинхронная работа</li>
                    <li>• Неблокирующий интерфейс</li>
                    <li>• Система приоритетов</li>
                    <li>• Отличная отзывчивость</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Use cases */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Когда Fiber особенно полезен
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Большие списки
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      Рендеринг тысяч элементов без блокировки интерфейса
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Сложные анимации
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      Плавные анимации с одновременными обновлениями
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Пользовательский ввод
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      Мгновенный отклик на клики, скролл, ввод текста
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Фоновые вычисления
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      Обработка данных без влияния на интерфейс
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
