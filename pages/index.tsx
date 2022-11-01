import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'

import { getSortedPostsData } from '../lib/posts'

import utilStyles from '../styles/utils.module.css'

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPostsData()
	return {
		props: {
			allPostsData, // pass allPostsData to Home as a prop
		},
	}
}

export default function Home({
	allPostsData,
}: {
	allPostsData: { date: string; title: string; id: string }[]
}) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>This is me</p>
				<p>
					(This is a sample website - you’ll be building a site like
					this on
					<a href='https://nextjs.org/learn'> our Next.js tutorial</a>
					.)
				</p>
			</section>
			<section
				className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
			>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}

/* example of SWR

import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}

*/
