import { useState, useEffect } from 'react';
import ReacktImg from '../../public/ReacktImg.png';

// Компонент для демонстрации Diffing Algorithm
const DiffingDemo = () => {
  const [oldTree, setOldTree] = useState({
    type: 'div',
    props: { className: 'container' },
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'World' } },
      { type: 'span', props: { children: 'React' } },
    ],
  });

  const [newTree, setNewTree] = useState(JSON.parse(JSON.stringify(oldTree)));
  const [showDiff, setShowDiff] = useState(false);
  const [diffResult, setDiffResult] = useState<any>(null);

  const generateDiff = () => {
    const changes: any[] = [];

    // Сравнение типов элементов
    if (oldTree.type !== newTree.type) {
      changes.push({
        type: 'REPLACE',
        path: [],
        oldValue: oldTree.type,
        newValue: newTree.type,
        description: 'Тип элемента изменился - полная замена',
      });
    } else {
      // Сравнение props
      const oldProps = oldTree.props || {};
      const newProps = newTree.props || {};

      Object.keys({ ...oldProps, ...newProps }).forEach((key) => {
        if ((oldProps as any)[key] !== (newProps as any)[key]) {
          changes.push({
            type: 'UPDATE_PROP',
            path: ['props', key],
            oldValue: (oldProps as any)[key],
            newValue: (newProps as any)[key],
            description: `Свойство "${key}" изменилось`,
          });
        }
      });

      // Сравнение children
      if (oldTree.children && newTree.children) {
        const maxLength = Math.max(
          oldTree.children.length,
          newTree.children.length
        );

        for (let i = 0; i < maxLength; i++) {
          const oldChild = oldTree.children[i];
          const newChild = newTree.children[i];

          if (!oldChild && newChild) {
            changes.push({
              type: 'ADD',
              path: ['children', i],
              newValue: newChild,
              description: `Добавлен новый элемент на позиции ${i}`,
            });
          } else if (oldChild && !newChild) {
            changes.push({
              type: 'REMOVE',
              path: ['children', i],
              oldValue: oldChild,
              description: `Удален элемент на позиции ${i}`,
            });
          } else if (oldChild && newChild) {
            if (oldChild.type !== newChild.type) {
              changes.push({
                type: 'REPLACE',
                path: ['children', i],
                oldValue: oldChild,
                newValue: newChild,
                description: `Элемент на позиции ${i} заменен`,
              });
            } else if (oldChild.props.children !== newChild.props.children) {
              changes.push({
                type: 'UPDATE_TEXT',
                path: ['children', i, 'props', 'children'],
                oldValue: oldChild.props.children,
                newValue: newChild.props.children,
                description: `Текст элемента на позиции ${i} изменен`,
              });
            }
          }
        }
      }
    }

    setDiffResult(changes);
  };

  const updateTree = (action: string) => {
    let updatedTree = JSON.parse(JSON.stringify(oldTree));

    switch (action) {
      case 'changeType':
        updatedTree.type = 'section';
        break;
      case 'changeClass':
        updatedTree.props.className = 'container updated';
        break;
      case 'addElement':
        updatedTree.children.push({
          type: 'p',
          props: { children: 'New Element' },
        });
        break;
      case 'removeElement':
        updatedTree.children.pop();
        break;
      case 'changeText':
        updatedTree.children[0].props.children = 'Updated Hello';
        break;
      case 'reorderElements':
        const temp = updatedTree.children[0];
        updatedTree.children[0] = updatedTree.children[1];
        updatedTree.children[1] = temp;
        break;
      case 'reset':
        updatedTree = JSON.parse(JSON.stringify(oldTree));
        break;
    }

    setNewTree(updatedTree);
    generateDiff();
  };

  useEffect(() => {
    generateDiff();
  }, [oldTree, newTree]);

  return (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
          Интерактивная демонстрация Diffing Algorithm
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => updateTree('changeType')}
            className="bg-[#00DBDB] hover:bg-[#00B8B8] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Изменить тип
          </button>
          <button
            onClick={() => updateTree('changeClass')}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Изменить класс
          </button>
          <button
            onClick={() => updateTree('addElement')}
            className="bg-[#4ECDC4] hover:bg-[#45B7AA] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Добавить элемент
          </button>
          <button
            onClick={() => updateTree('removeElement')}
            className="bg-[#FF9F43] hover:bg-[#F39C12] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Удалить элемент
          </button>
          <button
            onClick={() => updateTree('changeText')}
            className="bg-[#A55EEA] hover:bg-[#8B5CF6] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Изменить текст
          </button>
          <button
            onClick={() => updateTree('reorderElements')}
            className="bg-[#26DE81] hover:bg-[#20BF6B] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Переставить элементы
          </button>
          <button
            onClick={() => updateTree('reset')}
            className="bg-[#778CA3] hover:bg-[#4B6584] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Сбросить
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
              Старое дерево:
            </h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{JSON.stringify(oldTree, null, 2)}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#2D2D2D] mb-3">Новое дерево:</h4>
            <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{JSON.stringify(newTree, null, 2)}</pre>
            </div>
          </div>
        </div>

        {showDiff && diffResult && (
          <div className="mt-6">
            <h4 className="font-semibold text-[#2D2D2D] mb-3">
              Найденные изменения:
            </h4>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
              {diffResult.length === 0 ? (
                <div className="text-green-400">✅ Изменений не найдено</div>
              ) : (
                diffResult.map((change: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-gray-800 rounded">
                    <div className="text-white font-semibold">
                      {change.description}
                    </div>
                    <div className="text-red-400">Тип: {change.type}</div>
                    <div className="text-blue-400">
                      Путь: {change.path.join(' → ')}
                    </div>
                    {change.oldValue && (
                      <div className="text-gray-400">
                        Старое: {JSON.stringify(change.oldValue)}
                      </div>
                    )}
                    {change.newValue && (
                      <div className="text-green-400">
                        Новое: {JSON.stringify(change.newValue)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент для объяснения алгоритма
const AlgorithmExplanation = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: '1. Сравнение типов элементов',
      description: 'React сначала сравнивает типы элементов на одном уровне',
      code: `// Если типы разные - полная замена
if (oldElement.type !== newElement.type) {
  // Удалить старый элемент
  // Создать новый элемент
  return;
}`,
    },
    {
      title: '2. Сравнение props',
      description: 'Если типы одинаковые, React сравнивает props',
      code: `// Сравнение всех props
Object.keys({...oldProps, ...newProps}).forEach(key => {
  if (oldProps[key] !== newProps[key]) {
    // Обновить только изменившееся свойство
    updateProperty(element, key, newProps[key]);
  }
});`,
    },
    {
      title: '3. Сравнение children',
      description: 'React рекурсивно сравнивает дочерние элементы',
      code: `// Сравнение children по индексу
for (let i = 0; i < maxLength; i++) {
  const oldChild = oldChildren[i];
  const newChild = newChildren[i];
  
  if (!oldChild && newChild) {
    // Добавить новый элемент
  } else if (oldChild && !newChild) {
    // Удалить элемент
  } else {
    // Рекурсивно сравнить children
  }
}`,
    },
    {
      title: '4. Применение изменений',
      description: 'React применяет только найденные изменения к реальному DOM',
      code: `// React не пересоздает весь DOM!
// Только минимальные изменения:
// - Обновление текста
// - Изменение атрибутов
// - Добавление/удаление элементов
// - Перестановка элементов`,
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
  //   const interval = setInterval(nextStep, 6000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
        Как работает Diffing Algorithm
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

export const DiffingAlgorithm = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full bg-gradient-to-r from-[#AEAEAE]/80 via-[#AEAEAE]/40 to-transparent rounded-xl py-8 px-6 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
              React <span className="text-[#00DBDB]">Diffing Algorithm</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#2D2D2D]">
              Изучите как React сравнивает Virtual DOM деревья и определяет
              минимальные изменения для обновления реального DOM
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
            <DiffingDemo />
            <AlgorithmExplanation />

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Поэлементное сравнение
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  React сравнивает элементы на одном уровне дерева, не переходя
                  к дочерним элементам, если типы разные
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Минимальные изменения
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Алгоритм находит и применяет только те изменения, которые
                  действительно необходимы
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  Рекурсивность
                </h3>
                <p className="text-[#2D2D2D] text-sm">
                  Процесс сравнения применяется рекурсивно ко всем дочерним
                  элементам дерева
                </p>
              </div>
            </div>

            {/* Optimization strategies */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Стратегии оптимизации
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#00DBDB] mb-2">
                    🚀 Производительность:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Сравнение только на одном уровне</li>
                    <li>• Раннее прерывание при разных типах</li>
                    <li>• Минимальные DOM операции</li>
                    <li>• Batch обновления</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4ECDC4] mb-2">
                    🎯 Точность:
                  </h4>
                  <ul className="text-[#2D2D2D] text-sm space-y-1">
                    <li>• Детальное сравнение props</li>
                    <li>• Учет порядка элементов</li>
                    <li>• Сохранение состояния компонентов</li>
                    <li>• Правильная обработка key</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common patterns */}
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
                Частые паттерны изменений
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Изменение текста
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React обновляет только текстовое содержимое
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Изменение props
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React обновляет только изменившиеся атрибуты
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Добавление/удаление
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React добавляет или удаляет только нужные элементы
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#00DBDB] rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2D2D]">
                      Изменение типа
                    </h4>
                    <p className="text-[#2D2D2D] text-sm">
                      React полностью заменяет элемент при изменении типа
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
