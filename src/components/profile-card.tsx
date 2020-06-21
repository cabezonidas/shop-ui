import * as React from "react";
import { Box, H2, Anchor } from ".";
import { DateTime } from "luxon";
import { Instagram, Facebook, Whatsapp, Linkedin, Email, Messenger, Github } from "../icons";
import { useTranslation } from "../internationalization";
import { transform } from "../utils/transform";

interface IAuthorCard extends React.ComponentProps<typeof Box> {
  author: {
    name: string;
    dob?: number;
    email?: string;
    imageUrl?: string;
    linkedin?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    messenger?: string;
    github?: string;
    description?: Array<{ localeId?: string; text?: string }>;
  };
}

const enUsProfile = {
  ui: {
    profile: {
      img: "Profile",
      years: "{{years}} years old",
      description: "Description",
      linkedin: "Follow me on Linkedin",
      facebook: "Follow me on Facebook",
      instagram: "Follow me on Instagram",
      github: "Follow me on Github",
      whatsapp: "Text me on Whatsapp",
      messenger: "Text me on Messenger",
      email: "Email me",
    },
  },
};
const esArProfile = {
  ui: {
    profile: {
      img: "Perfil",
      years: "{{years}} años",
      description: "Descripción",
      linkedin: "Sígueme en Linkedin",
      facebook: "Sígueme en Facebook",
      instagram: "Sígueme en Instagram",
      github: "Sígueme en Github",
      whatsapp: "Escríbame en Whatsapp",
      messenger: "Escríbame en Messenger",
      email: "Escríbame al email",
    },
  },
};

export const ProfileCard = React.forwardRef<HTMLDivElement, IAuthorCard>((props, ref) => {
  const { author, ...boxProps } = props;

  const { t, i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", enUsProfile, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArProfile, true, true);

  const {
    linkedin,
    whatsapp,
    instagram,
    facebook,
    imageUrl,
    name,
    dob,
    email,
    messenger,
    description,
    github,
  } = author;

  const desc =
    description?.find(d => d.text && d.localeId === i18n.language)?.text ||
    description?.find(d => !!d.text)?.text ||
    "";

  const linkedinLink = linkedin && `https://www.linkedin.com/in/${linkedin}/`;
  const whatsappLink = whatsapp && `https://api.whatsapp.com/send?phone=${whatsapp}`;
  const instagramLink = instagram && `https://www.instagram.com/${instagram}/`;
  const facebookLink = facebook && `https://www.facebook.com/${facebook}`;
  const messengerLink = messenger && `https://www.messenger.com/t/${messenger}`;
  const githubLink = github && `https://github.com/${github}`;

  const personalInfo = (() => {
    const res: string[] = [];
    if (dob) {
      res.push(
        t("ui.profile.years", {
          years: Math.floor(
            DateTime.local()
              .diff(DateTime.fromMillis(dob))
              .as("years")
          ),
        })
      );
    }
    if (desc) {
      res.push(desc);
    }
    return res.join(" - ");
  })();

  return (
    <Box
      display="grid"
      gridTemplateColumns="auto 1fr"
      {...boxProps}
      ref={ref}
      height="max-content"
      gridGap="2"
    >
      <Box maxWidth="150px" maxHeight="150px">
        {imageUrl && (
          <img
            style={{ width: 150, height: 150, borderRadius: "50%" }}
            alt={t("ui.profile.img")}
            src={transform(imageUrl, { width: "150px", height: "150px", focus: "face" })}
          />
        )}
      </Box>
      <Box display="grid" gridGap="1" height="max-content">
        <Box>
          <H2 mb="2">{name}</H2>
        </Box>
        {personalInfo && (
          <Box mb="3" mt="2 ">
            {personalInfo}
          </Box>
        )}

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gridGap="2">
          {githubLink && (
            <ContactItem>
              <Github />
              <ContactAnchor href={githubLink}>{github}</ContactAnchor>
            </ContactItem>
          )}
          {linkedinLink && (
            <ContactItem>
              <Linkedin />
              <ContactAnchor href={linkedinLink}>{t("ui.profile.linkedin")}</ContactAnchor>
            </ContactItem>
          )}
          {whatsappLink && (
            <ContactItem>
              <Whatsapp />
              <ContactAnchor aria-label={t("ui.profile.whatsapp")} href={whatsappLink}>
                {whatsapp}
              </ContactAnchor>
            </ContactItem>
          )}
          {instagramLink && (
            <ContactItem>
              <Instagram />
              <ContactAnchor aria-label={t("ui.profile.instagram")} href={instagramLink}>
                {`@${instagram}`}
              </ContactAnchor>
            </ContactItem>
          )}
          {facebookLink && (
            <ContactItem>
              <Facebook />
              <ContactAnchor aria-label={t("ui.profile.facebook")} href={facebookLink}>
                {`/${facebook}`}
              </ContactAnchor>
            </ContactItem>
          )}
          {messengerLink && (
            <ContactItem>
              <Messenger />
              <ContactAnchor aria-label={t("ui.profile.messenger")} href={messengerLink}>
                {`${messenger}`}
              </ContactAnchor>
            </ContactItem>
          )}
          {email && (
            <ContactItem>
              <Email />
              <ContactAnchor aria-label={t("ui.profile.email")} href={`mailto:${email}`}>
                {email}
              </ContactAnchor>
            </ContactItem>
          )}
        </Box>
      </Box>
    </Box>
  );
});

const ContactItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    return (
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        gridGap="1"
        overflow="hidden"
        {...props}
        ref={ref}
      />
    );
  }
);

const ContactAnchor = Anchor;
ContactAnchor.defaultProps = {
  overflow: "hidden",
  style: { whiteSpace: "nowrap", textOverflow: "ellipsis" },
};
