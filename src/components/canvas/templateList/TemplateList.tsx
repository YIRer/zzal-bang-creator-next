import React from 'react';
import templates from '@/data/template.json';

type Props = {
  addTemplate: (path: string) => void;
};

const TemplateList = ({ addTemplate }: Props) => {
  return (
    <div>
      {Object.keys(templates).map((key) => {
        return (
          <div key={key}>
            {templates[key as keyof typeof templates].map((template, index) => {
              return (
                <div
                  key={`${key}-${template.name}-${index}`}
                  onClick={() => {
                    addTemplate(template.path);
                  }}
                >
                  <img src={template.path} />
                  <span>{template.name}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TemplateList;
