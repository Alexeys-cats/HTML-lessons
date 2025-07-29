import { useState, useEffect } from 'react';
import ReacktImg from '../../public/ReacktImg.png';

const ReconciliationDemo = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [key, setKey] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [previousItems, setPreviousItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
  ]);
  const [diffMode, setDiffMode] = useState<'normal' | 'withKey'>('normal');

  const addItem = () => {
    setPreviousItems([...items]);
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = (index: number) => {
    setPreviousItems([...items]);
    setItems(items.filter((_, i) => i !== index));
  };

  const shuffleItems = () => {
    setPreviousItems([...items]);
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const resetWithKey = () => {
    setPreviousItems([...items]);
    setKey((prev) => prev + 1);
    setItems(['Item 1', 'Item 2', 'Item 3']);
    setDiffMode('withKey');
  };

  const resetNormal = () => {
    setPreviousItems([...items]);
    setItems(['Item 1', 'Item 2', 'Item 3']);
    setDiffMode('normal');
  };

  // Генерируем diff между старым и новым состоянием
  const generateDiff = () => {
    if (diffMode === 'withKey') {
      return {
        type: 'key-change' as const,
        message: 'При изменении key React пересоздает ВСЕ элементы',
        oldItems: previousItems,
        newItems: items,
        explanation: 'React видит новые key и считает все элементы новыми',
      };
    }

    const added = items.filter((item) => !previousItems.includes(item));
    const removed = previousItems.filter((item) => !items.includes(item));
    const moved = items.filter(
      (item, index) =>
        previousItems.includes(item) && previousItems.indexOf(item) !== index
    );

    return {
      type: 'normal' as const,
      added,
      removed,
      moved,
      oldItems: previousItems,
      newItems: items,
      explanation:
        added.length > 0 || removed.length > 0
          ? 'React добавляет/удаляет элементы'
          : moved.length > 0
            ? 'React перемещает существующие элементы'
            : 'Изменений нет',
    };
  };

  const diff = generateDiff();

  return (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
          Интерактивная демонстрация Reconciliation
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={addItem}
            className="bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Добавить элемент
          </button>
          <button
            onClick={shuffleItems}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Перемешать
          </button>
          <button
            onClick={resetNormal}
            className="bg-[#4ECDC4] hover:bg-[#45B7AA] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Сбросить (обычно)
          </button>
          <button
            onClick={resetWithKey}
            className="bg-[#FF9F43] hover:bg-[#F39C12] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Сбросить с новым key
          </button>
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="bg-[#FFE66D] hover:bg-[#FFD93D] text-[#2D2D2D] px-4 py-2 rounded-lg transition-colors"
          >
            {showDiff ? 'Скрыть' : 'Показать'} Diff
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-[#2D2D2D] mb-3">
              Текущий список:
            </h4>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={
                    diffMode === 'withKey'
                      ? `new-key-${index}`
                      : `${key}-${index}`
                  }
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span className="text-[#2D2D2D]">{item}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {showDiff && (
            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-3">
                Virtual DOM Diff:
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                {diff.type === 'key-change' ? (
                  <>
                    <div className="text-red-400 mb-2">⚠️ Изменение key:</div>
                    <div className="text-yellow-400 mb-2">
                      {diff.oldItems.map((item, index) => (
                        <div key={index} className="ml-4 text-gray-400">
                          &lt;div key="old-key-{index}"&gt;{item}&lt;/div&gt; ❌
                          Удалено
                        </div>
                      ))}
                    </div>
                    <div className="text-green-400">
                      {diff.newItems.map((item, index) => (
                        <div key={index} className="ml-4">
                          &lt;div key="new-key-{index}"&gt;{item}&lt;/div&gt; ✅
                          Создано
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-blue-400">
                      // React пересоздает ВСЕ элементы из-за новых key
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-blue-400 mb-2">
                      📊 Обычное сравнение:
                    </div>
                    {diff.added && diff.added.length > 0 && (
                      <div className="text-green-400 mb-2">
                        <div>✅ Добавлено:</div>
                        {diff.added.map((item, index) => (
                          <div key={index} className="ml-4">
                            &lt;div&gt;{item}&lt;/div&gt;
                          </div>
                        ))}
                      </div>
                    )}
                    {diff.removed && diff.removed.length > 0 && (
                      <div className="text-red-400 mb-2">
                        <div>❌ Удалено:</div>
                        {diff.removed.map((item, index) => (
                          <div key={index} className="ml-4 text-gray-400">
                            &lt;div&gt;{item}&lt;/div&gt;
                          </div>
                        ))}
                      </div>
                    )}
                    {diff.moved && diff.moved.length > 0 && (
                      <div className="text-yellow-400 mb-2">
                        <div>🔄 Перемещено:</div>
                        {diff.moved.map((item, index) => (
                          <div key={index} className="ml-4">
                            &lt;div&gt;{item}&lt;/div&gt;
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 text-blue-400">
                      // React переиспользует элементы с одинаковыми key
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-[#2D2D2D] mb-2">
                  Объяснение:
                </h5>
                <p className="text-[#2D2D2D] text-sm">{diff.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DiffingAlgorithm = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: '1. Сравнение типов элементов',
      description: 'React сравнивает типы элементов (div, span, компонент)',
      code: `// Старый элемент
<div className="item">Hello</div>

// Новый элемент  
<span className="item">Hello</span>

// React пересоздает элемент полностью`,
    },
    {
      title: '2. Сравнение props',
      description: 'React сравнивает props и обновляет только изменившиеся',
      code: `// Старый элемент
<div className="item" style={{color: 'red'}}>Hello</div>

// Новый элемент
<div className="item" style={{color: 'blue'}}>Hello</div>

// React обновляет только style`,
    },
    {
      title: '3. Сравнение children',
      description: 'React рекурсивно сравнивает дочерние элементы',
      code: `// Старый список
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2</li>
</ul>

// Новый список
<ul>
  <li key="1">Item 1</li>
  <li key="3">Item 3</li>
  <li key="2">Item 2</li>
</ul>

// React переиспользует элементы с key="1" и key="2"`,
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
  //   const interval = setInterval(nextStep, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
        Алгоритм Diffing
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

export const Reconcilation = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full bg-gradient-to-r from-[#AEAEAE]/80 via-[#AEAEAE]/40 to-transparent rounded-xl py-8 px-6 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
              React <span className="text-[#00DBDB]">Reconciliation</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#2D2D2D]">
              Изучите как React эффективно обновляет DOM, сравнивая Virtual DOM
              и применяя алгоритм diffing для оптимизации производительности
            </p>
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
            <ReconciliationDemo />
            <DiffingAlgorithm />

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Virtual DOM
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Легковесная копия реального DOM, которая позволяет React
                  эффективно сравнивать изменения
                </p>
                <div className="mt-4">
                  <a
                    href="/#/virtual-dom"
                    className="inline-block bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Узнать больше →
                  </a>
                </div>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Diffing Algorithm
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Алгоритм сравнения, который определяет минимальные изменения
                  для обновления реального DOM
                </p>
                <div className="mt-4">
                  <a
                    href="/#/diffing-algorithm"
                    className="inline-block bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Узнать больше →
                  </a>
                </div>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">Fiber</h3>
                <p className="text-[#2D2D2D] text-sm">
                  Новая архитектура React для управления рендерингом,
                  позволяющая прерывать и возобновлять работу
                </p>
                <div className="mt-4">
                  <a
                    href="/#/fiber"
                    className="inline-block bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Узнать больше →
                  </a>
                </div>
              </div>
            </div>

            {/* Best practices */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Лучшие практики
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#00DBDB] mb-2">
                    ✅ Что делать:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Используйте стабильные key для списков</li>
                    <li>• Избегайте изменения key при обновлениях</li>
                    <li>• Используйте React.memo для оптимизации</li>
                    <li>• Размещайте state как можно выше в дереве</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#FF6B6B] mb-2">
                    ❌ Чего избегать:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Использование index как key</li>
                    <li>• Изменение key при каждом рендере</li>
                    <li>• Создание объектов в render</li>
                    <li>• Неправильное использование useEffect</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
