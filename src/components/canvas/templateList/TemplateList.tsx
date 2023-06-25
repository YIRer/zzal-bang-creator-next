import React from 'react';
import templates from '@/data/template.json';
import styles from './template.module.css';
import { Image, Typography } from 'antd';

type Props = {
  addTemplate: (path: string) => void;
};

const TemplateList = ({ addTemplate }: Props) => {
  return (
    <div className={styles.templateWrapper}>
      {Object.keys(templates).map((key) => {
        return templates[key as keyof typeof templates].map(
          (template, index) => {
            return (
              <div
                className={styles.templateItem}
                key={`${key}-${template.name}-${index}`}
                onClick={() => {
                  addTemplate(template.path);
                }}
              >
                <Typography.Text>{template.name}</Typography.Text>
                <Image
                  src={template.path}
                  width={180}
                  height={180}
                  preview={false}
                />
              </div>
            );
          }
        );
      })}
    </div>
  );
};

export default TemplateList;
