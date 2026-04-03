import { useEffect, useRef, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const { filters } = useFinance();

  const handleToggleSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const root = mainRef.current;
    if (!root) {
      return;
    }

    const clearHighlights = () => {
      const marks = root.querySelectorAll('mark[data-global-highlight="true"]');
      marks.forEach((markElement) => {
        const parent = markElement.parentNode;
        if (!parent) {
          return;
        }
        parent.replaceChild(document.createTextNode(markElement.textContent || ''), markElement);
        parent.normalize();
      });
    };

    const query = (filters.search || '').trim();
    clearHighlights();

    if (!query) {
      return;
    }

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const testRegex = new RegExp(escapedQuery, 'i');
    const splitRegex = new RegExp(`(${escapedQuery})`, 'ig');

    const shouldSkipElement = (element) => {
      if (!element) {
        return false;
      }
      const tagName = element.tagName;
      return (
        tagName === 'SCRIPT' ||
        tagName === 'STYLE' ||
        tagName === 'MARK' ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        tagName === 'BUTTON' ||
        tagName === 'SVG'
      );
    };

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent || shouldSkipElement(parent) || parent.closest('mark')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return testRegex.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const textNodes = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      textNodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const originalText = textNode.nodeValue || '';
      const parts = originalText.split(splitRegex);
      if (parts.length <= 1) {
        return;
      }

      const fragment = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) {
          return;
        }

        if (part.toLowerCase() === query.toLowerCase()) {
          const mark = document.createElement('mark');
          mark.setAttribute('data-global-highlight', 'true');
          mark.className = 'rounded bg-yellow-200/80 px-1 text-slate-900 dark:bg-yellow-500/30 dark:text-yellow-100';
          mark.textContent = part;
          fragment.appendChild(mark);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      const parent = textNode.parentNode;
      if (parent) {
        parent.replaceChild(fragment, textNode);
      }
    });

    const firstMatch = root.querySelector('mark[data-global-highlight="true"]');
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [filters.search, children]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(148,163,184,0.18),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(71,85,105,0.28),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(125,211,252,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.16),transparent_50%)] delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(203,213,225,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_40%_40%,rgba(100,116,139,0.16),transparent_50%)] delay-500"></div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <main ref={mainRef} className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-5 md:px-6 md:py-8">
        {children}
      </main>
      
      {/* Footer Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-slate-200/70 to-transparent dark:from-slate-950"></div>
    </div>
  );
}
