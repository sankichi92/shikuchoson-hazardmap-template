import pandas as pd
import os.path

dirname = os.path.dirname(__file__)

df = pd.read_excel(
    os.path.join(dirname, '../data_original/hachioji_hinanjo.xlsx'),
    sheet_name='投入データ',
    index_col=0,
    na_values=[9],
)

df = df[df['削除'] != True]
df.drop(['自治体名', 'コード'], axis=1, inplace=True)
df.dropna(axis=1, how='all', inplace=True)
df.replace({0: False, 1: True}, inplace=True)
df.index.name = 'ID'

df.to_csv(os.path.join(dirname, '../data/hachioji_hinanjo.csv'))
