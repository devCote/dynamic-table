import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export default function Home() {


  const [data, setData] = useState()
  const [check, setCheck] = useState('id')
  const [reverse, setReverse] = useState(false)
  const filteredKeysFromAPI = ['address', 'website', 'image']
  const arrowDown = '▼'
  const arrowUp = '▲'


  /* eslint */
  useEffect(() => {

    const filterFunc = (arr) => {
      let newData = arr

      filteredKeysFromAPI.forEach(val =>
        newData = [...newData.map(obj => Object.fromEntries(Object.entries(obj)
          .filter(([key]) => !key.includes(val))))]
      )
      return newData
    }

    fetch('https://fakerapi.it/api/v1/persons?_quantity=10').then(res => res.json()).then(data => {
      setData([...filterFunc(data.data)])
    })
  }, [])

  const sortData = (e) => {

    let checkReverse = false

    if (e.target.innerHTML.includes(arrowDown)) {
      setReverse(true)
      checkReverse = true
    } else setReverse(false)


    const sortItem = e.target.id
    const newArr = [...data]

    if (!checkReverse) {
      newArr.sort(function(a, b) {
        const nameA = Object.values(a).find(key => a[sortItem] === key)
        const nameB = Object.values(b).find(key => b[sortItem] === key)

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      newArr.sort(function(a, b) {
        const nameA = Object.values(a).find(key => a[sortItem] === key)
        const nameB = Object.values(b).find(key => b[sortItem] === key)

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

    }

    setData([...newArr])
    setCheck(e.target.id)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TableContainer>
        <Table variant='simple' size={'md'}>
          <Thead>
            <Tr bg={'whiteAlpha.100'}>
              {data && Object.keys(data[0]).map(key =>
                <Th onClick={e => sortData(e)} key={key}
                  backgroundColor={check === key && "darkgreen"}
                  cursor='pointer'
                  id={key}>{key} {check === key && reverse && arrowUp}
                  {check === key && !reverse && arrowDown}
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {
              data && data.map(obj =>
              (<Tr key={obj.id}>
                {Object.values(obj).map(val => (<Td key={val}>
                  {val}
                </Td>))}
              </Tr>)
              )}
          </Tbody>
        </Table>
      </TableContainer>

    </div >

  )
}
