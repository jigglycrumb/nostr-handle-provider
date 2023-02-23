import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useCopyToClipboard } from "../hooks";

type CopyWrapperProps = {
  children: React.ReactNode;
  text: string;
};

const animationSpeed = 1000;

export const CopyWrapper = ({ children, text }: CopyWrapperProps) => {
  const [_clipboardText, setClipboardText] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const nodeRef = useRef(null);

  const handleCopy = () => {
    setClipboardText(text).then(success => {
      if (success) {
        setCopied(true);
      }
    });
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, animationSpeed);
    }
  }, [copied]);

  return (
    <div className="copy-wrapper" onClick={handleCopy}>
      <CSSTransition
        in={copied}
        nodeRef={nodeRef}
        timeout={animationSpeed}
        classNames="success"
        unmountOnExit
      >
        <div className="success box" ref={nodeRef}>
          <span className="text-gradient">Copied!</span>
        </div>
      </CSSTransition>
      {children}
    </div>
  );
};
