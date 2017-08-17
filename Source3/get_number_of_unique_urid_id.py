
# coding: utf-8

# In[ ]:


import pandas as pd


# In[ ]:


df = pd.read_csv('/Users/phayate/src/HRAna.prvt/Result/analyze-deta.csv', index_col=0,header=0)


# In[ ]:


df


# In[ ]:


sorted_df = df.sort_values(by=["pred"], ascending=True)


# In[ ]:


sorted_df


# In[ ]:


urid_df = df[['urid']]


# In[ ]:


urid_df


# In[ ]:


li = urid_df.values.tolist()


# In[ ]:


print(set(li))


# In[ ]:


sorted_df = df.sort_values(by=["urid"], ascending=True)
print(sorted_df)


# In[ ]:


urid_df = df[['urid']]
li = urid_df.values.tolist()
print(type(li))


# In[ ]:


print(li)


# In[ ]:


urid_df = df[['urid']]
li = urid_df.tolist()


# In[ ]:


li = df['urid'].tolist
print(li)


# In[ ]:


type(li)


# In[ ]:


set(li)


# In[ ]:


l = list(df['urid'])


# In[ ]:


l


# In[ ]:


a=set(l)


# In[ ]:


print(len(a))
print(len(df))


# In[ ]:


import pandas as pd
df = pd.read_csv('/Users/phayate/src/HRAna.prvt/Result/analyze-deta.csv',header=0)
urid_df = df[['urid']]
li = list(urid_df)


# In[ ]:


print(type(urid_df))
urid_df.tolist()


# In[ ]:


l = list(df['urid'])
print(len(l))
print(len(set(l)))

