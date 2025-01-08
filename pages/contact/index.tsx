import Layout from "~/components/Layout/Layout";
import formStyles from "./ContactForm.module.scss";
import styles from "./Contact.module.scss";
import Meta from "~/components/Meta";
import clsx from "clsx";
import config from "~/lib/config";

export default function Contact() {
	return (
		<Layout>
			<Meta title="Contact Nicu Surdu" />
			<div className={styles.contactForm}>
				<div className={styles.intro}>
					<h1>Let&apos;s chat</h1>
					<p>Got a question, a suggestion, or just want to say hi?</p>
					<p>
						Fill out the form and I&apos;ll get back to you as soon as I can!
					</p>
				</div>
				<div className={styles.form}>
					<form
						action="https://api.staticforms.xyz/submit"
						method="post"
						className={formStyles.formGroup}
					>
						<input
							type="hidden"
							name="accessKey"
							value="1571e49f-6779-4475-bd96-4bbaa3da1216"
						/>
						<div className={formStyles.formGroup}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								className={formStyles.formControl}
								id="name"
							/>
						</div>
						<div className={formStyles.formGroup}>
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								className={formStyles.formControl}
								id="email"
							/>
						</div>
						<div className={formStyles.formGroup}>
							<label htmlFor="message">Message</label>
							<textarea
								name="message"
								className={clsx(formStyles.formControl, formStyles.textarea)}
								id="message"
							></textarea>
						</div>
						<input
							type="hidden"
							name="redirectTo"
							value={`https://${config.domain}/contact/success`}
						/>
						<button type="submit" className={formStyles.btnPrimary}>
							Send
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
