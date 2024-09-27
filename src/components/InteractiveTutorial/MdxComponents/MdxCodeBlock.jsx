import React from 'react';
import PropTypes from 'prop-types';
import { requestFromCode } from '../../CodeEditorWindow/config/RequesFromCode';
import { useTutorial } from '../../../context/tutorial-context';
import { bigIntJSON } from '../../../common/bigIntJSON';
import { CodeBlock } from '../../Common/CodeBlock';

/**
 * Code block with syntax highlighting
 * @param {object} children - code block content from mdx
 * @return {JSX.Element}
 * @constructor
 */
export const MdxCodeBlock = ({ children }) => {
  const className = children.props.className || '';
  const code = children.props.children.trim();
  const language = className.replace(/language-/, '');
  const withRunButton = children.props.withRunButton && bigIntJSON.parse(children.props.withRunButton);
  const { setResult } = useTutorial();
  const [loading, setLoading] = React.useState(false);

  const handleRun = (code) => {
    setLoading(true);
    setResult('{}');
    requestFromCode(code, false)
      .then((res) => {
        setResult(() => bigIntJSON.stringify(res));
        setLoading(false);
      })
      .catch((err) => {
        setResult(() => bigIntJSON.stringify(err));
        setLoading(false);
      });
  };

  return (
    <CodeBlock codeStr={code} language={language} withRunButton={withRunButton} onRun={handleRun} loading={loading} />
  );
};

MdxCodeBlock.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.shape({
      className: PropTypes.string,
      children: PropTypes.string.isRequired,
      withRunButton: PropTypes.string,
    }),
  }),
};
