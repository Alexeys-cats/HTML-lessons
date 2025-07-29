import { useState, useEffect } from 'react';
import ReacktImg from '../../public/ReacktImg.png';

// Компонент для демонстрации Virtual DOM
const VirtualDOMDemo = () => {
  const [virtualDOM, setVirtualDOM] = useState({
    type: 'div',
    props: {
      className: 'container',
      children: [
        { type: 'h1', props: { children: 'Hello World' } },
        { type: 'p', props: { children: 'This is a paragraph' } },
      ],
    },
  });

  const [realDOM, setRealDOM] = useState(
    JSON.parse(JSON.stringify(virtualDOM))
  );
  const [showDiff, setShowDiff] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateVirtualDOM = (newStructure: any) => {
    setIsUpdating(true);
    setVirtualDOM(newStructure);

    // Симуляция процесса reconciliation
    setTimeout(() => {
      setRealDOM(JSON.parse(JSON.stringify(newStructure)));
      setIsUpdating(false);
    }, 1000);
  };

  const addElement = () => {
    const newVirtualDOM = {
      ...virtualDOM,
      props: {
        ...virtualDOM.props,
        children: [
          ...virtualDOM.props.children,
          {
            type: 'p',
            props: {
              children: `New element ${virtualDOM.props.children.length + 1}`,
            },
          },
        ],
      },
    };
    updateVirtualDOM(newVirtualDOM);
  };

  const changeText = () => {
    const newVirtualDOM = {
      ...virtualDOM,
      props: {
        ...virtualDOM.props,
        children: virtualDOM.props.children.map((child: any, index: number) =>
          index === 0
            ? { ...child, props: { ...child.props, children: 'Updated Text' } }
            : child
        ),
      },
    };
    updateVirtualDOM(newVirtualDOM);
  };

  const changeClass = () => {
    const newVirtualDOM = {
      ...virtualDOM,
      props: {
        ...virtualDOM.props,
        className:
          virtualDOM.props.className === 'container'
            ? 'container updated'
            : 'container',
      },
    };
    updateVirtualDOM(newVirtualDOM);
  };

  const reset = () => {
    const originalStructure = {
      type: 'div',
      props: {
        className: 'container',
        children: [
          { type: 'h1', props: { children: 'Hello World' } },
          { type: 'p', props: { children: 'This is a paragraph' } },
        ],
      },
    };
    updateVirtualDOM(originalStructure);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
          Интерактивная демонстрация Virtual DOM
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={addElement}
            className="bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Добавить элемент
          </button>
          <button
            onClick={changeText}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Изменить текст
          </button>
          <button
            onClick={changeClass}
            className="bg-[#4ECDC4] hover:bg-[#45B7AA] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Изменить класс
          </button>
          <button
            onClick={reset}
            className="bg-[#FF9F43] hover:bg-[#F39C12] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Сбросить
          </button>
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="bg-[#FFE66D] hover:bg-[#FFD93D] text-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
          >
            {showDiff ? 'Скрыть' : 'Показать'} Сравнение
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-[#2D2D2D] mb-3">Virtual DOM:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{JSON.stringify(virtualDOM, null, 2)}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#2D2D2D] mb-3">Real DOM:</h4>
            <div
              className={`bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto ${isUpdating ? 'animate-pulse' : ''}`}
            >
              <pre>{JSON.stringify(realDOM, null, 2)}</pre>
            </div>
            {isUpdating && (
              <div className="mt-2 text-orange-500 text-sm">
                🔄 Обновление Real DOM...
              </div>
            )}
          </div>
        </div>

        {showDiff && (
          <div className="mt-6">
            <h4 className="font-semibold text-[#2D2D2D] mb-3">
              Сравнение структур:
            </h4>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
              <div className="mb-2">
                // React сравнивает Virtual DOM с Real DOM
              </div>
              <div className="text-green-400">
                {JSON.stringify(virtualDOM) === JSON.stringify(realDOM)
                  ? '✅ Структуры идентичны'
                  : '❌ Обнаружены различия'}
              </div>
              <div className="mt-2 text-blue-400">
                // React обновляет только изменившиеся части Real DOM
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент для объяснения процесса
const VirtualDOMProcess = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: '1. Создание Virtual DOM',
      description: 'React создает легковесную копию реального DOM в памяти',
      code: `// Virtual DOM - JavaScript объект
const virtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } }
    ]
  }
};`,
    },
    {
      title: '2. Изменение состояния',
      description: 'При изменении state React создает новый Virtual DOM',
      code: `// Новый Virtual DOM после изменения
const newVirtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Updated Hello' } }
    ]
  }
};`,
    },
    {
      title: '3. Сравнение (Diffing)',
      description: 'React сравнивает старый и новый Virtual DOM',
      code: `// React находит различия
const differences = {
  type: 'text',
  path: ['children', 0, 'props', 'children'],
  oldValue: 'Hello',
  newValue: 'Updated Hello'
};`,
    },
    {
      title: '4. Обновление Real DOM',
      description: 'React применяет только найденные изменения к реальному DOM',
      code: `// React обновляет только изменившуюся часть
realDOM.children[0].props.children = 'Updated Hello';
// Не пересоздает весь DOM!`,
    },
  ];

  // const nextStep = () => {
  //   setIsAnimating(true);
  //   setTimeout(() => {
  //     setStep((prev) => (prev + 1) % steps.length);
  //     setIsAnimating(false);
  //   }, 300);
  // };

  // автоплей если нужно
  // useEffect(() => {
  //   const interval = setInterval(nextStep, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
        Процесс работы Virtual DOM
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

export const VirtualDOM = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full bg-gradient-to-r from-[#AEAEAE]/80 via-[#AEAEAE]/40 to-transparent rounded-xl py-8 px-6 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
              React <span className="text-[#00DBDB]">Virtual DOM</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#2D2D2D]">
              Изучите как React использует Virtual DOM для эффективного
              обновления пользовательского интерфейса и оптимизации
              производительности
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
            <VirtualDOMDemo />
            <VirtualDOMProcess />

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Легковесность
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Virtual DOM - это JavaScript объект, который намного быстрее
                  для операций чтения и записи чем реальный DOM
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Batch Updates
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  React группирует множественные обновления в один проход,
                  минимизируя количество операций с DOM
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Diffing Algorithm
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Умный алгоритм сравнения, который определяет минимальные
                  изменения для обновления реального DOM
                </p>
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Преимущества Virtual DOM
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#00DBDB] mb-2">
                    🚀 Производительность:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Быстрые операции сравнения в памяти</li>
                    <li>• Минимальные обновления реального DOM</li>
                    <li>• Группировка множественных изменений</li>
                    <li>• Оптимизация рендеринга</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4ECDC4] mb-2">
                    🎯 Разработка:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Декларативный подход к UI</li>
                    <li>• Автоматическое управление DOM</li>
                    <li>• Предсказуемое поведение</li>
                    <li>• Легкое тестирование</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Как это работает
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Создание Virtual DOM
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React создает JavaScript объект, представляющий структуру
                      UI
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Изменение состояния
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      При изменении state создается новый Virtual DOM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">Сравнение</h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React сравнивает старый и новый Virtual DOM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Обновление DOM
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      Применяются только найденные изменения к реальному DOM
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
