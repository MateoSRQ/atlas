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
import React, { useEffect, useRef, useState } from 'react';
import style from './component.module.css'
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES'
import axios from 'axios'

type DataSourceType = {
  id: React.Key;
  sede: string;
  espacio: string;
  norma: string;
  aforo?: number;
};




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
  const [data, setData] = useState<DataSourceType[]>([])

  useEffect(() => {
    // declare the data fetching function
    console.log('useEffect')
    let _tempData: DataSourceType[] = []
    const fetchData = async () => {
      const d = await axios.get('http://127.0.0.1:5984/test/_all_docs?include_docs=true', {
        auth: {
            username: 'admin',
            password: 'admin'
        }
      })
      for (const document of d.data.rows) {
        _tempData.push(document.doc)
      }
      setData(_tempData)
    }
  
    // call the function
    fetchData()
      .catch(console.error);
  }, [])


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
            table: data,
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



