import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { PostGrid } from '../components/grid';
import Layout from '../components/layout';
import { getFooterMenu } from '../lib/Menus';
import { getLatestPosts } from '../lib/Posts';
import { setOutgoingHeaders } from '../lib/setOutgoingHeaders';
import styles from './index.module.css';

export default function Home({ menuItems, posts }) {
	const HomepageHeader = () => (
		<div className={`${styles.header} font-extrabold text-center w-fit`}>
			<h1>
				Welcome to{' '}
				<a className={`${styles.next} text-blue-500`} href="https://nextjs.org">
					Next.js!
				</a> a PR!
			</h1>
			<div className={styles.onPantheon}>
				<span>Decoupled WordPress on </span>
				<Image
					src="/pantheon.png"
					alt="Pantheon Logo"
					style={{
						margin: 0,
					}}
					width={191}
					height={60}
				/>
			</div>
		</div>
	);

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create-pantheon-decoupled-kit."
			/>
			<HomepageHeader />
			<section>
				<PostGrid contentType="posts" data={posts} />
			</section>
		</Layout>
	);
}

export async function getServerSideProps({ res }) {
	const { menuItems, menuItemHeaders } = await getFooterMenu();
	const { posts, headers: postHeaders } = await getLatestPosts(12);

	const headers = [menuItemHeaders, postHeaders];
	setOutgoingHeaders({ headers, res });

	return {
		props: {
			menuItems,
			posts,
		},
	};
}
