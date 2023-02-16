import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import style from './component.module.css'
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES'

type DataSourceType = {
  id: React.Key;
  sede: string;
  espacio: string;
  norma: string;
  aforo?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    sede: 'Sede 1',
    espacio: 'Aula 101',
    norma: 'Norma 1',
    aforo: 0
  },
  {
    id: 624691229,
    sede: 'Sede 1',
    espacio: 'Aula 102',
    norma: 'Norma 1',
    aforo: 0  
  },
  {
    id: 624748503,
    sede: 'Sede 2',
    espacio: 'Aula 101',
    norma: 'Norma 2',
    aforo: 0
  },
  {
    id: 6247485034,
    sede: 'Sede 2',
    espacio: 'Aula 102',
    norma: 'Norma 1',
    aforo: 0
  },
  {
    id: 348503,
  sede: 'Sede 2',
  espacio: 'Aula 103',
  norma: 'Norma 3',
  aforo: 0
  }
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Sede',
      dataIndex: 'sede',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: 'Espacio',
      dataIndex: 'espacio',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: 'Norma',
      key: 'norma',
      dataIndex: 'norma',
      valueType: 'select',
      valueEnum: {
        norma1: { text: 'Norma 1', status: 'Norma 1' },
        norma2: { text: 'Norma 2', status: 'Norma 2' },
        norma3: { text: 'Norma 3', status: 'Norma 3' },
      },
    }

  ];


  return (
    <div className={style.component}>
      <ConfigProvider locale={esES}>
        <ProCard>
      <div
        style={{
          maxWidth: 1600,
          margin: 'auto',
        }}
      >
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >

          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: 'Editor del banco de preguntas',
              rules: [
                {
                  validator: async (_, value) => {
                    if (value.length < 1) {
                      throw new Error('Editor del banco de preguntas');
                    }

                  },
                },
              ],
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },

            }}
            
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </div>
        </ProCard>
      </ConfigProvider>
    </div>
  )
}



