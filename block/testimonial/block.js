( function( blocks, components, i18n, element ) {
	var el = element.createElement;

	blocks.registerBlockType(

		// The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		'nelio/testimonial-block', {

		// The title of our block.
		title: i18n.__( 'Testimonial' ),

		// Dashicon icon for our block.
		icon: 'megaphone',

		// The category of the block.
		category: 'common',

		// Necessary for saving block content.
		attributes: {
			name: {
				type: 'array',
				source: 'children',
				selector: 'p.nelio-testimonial-name',
			},
			position: {
				type: 'array',
				source: 'children',
				selector: 'p.nelio-testimonial-position',
			},
			testimonial: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			alignment: {
				type: 'string',
				default: 'center',
			}
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'name' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var contactURL = props.attributes.contactURL;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				!! focus && el( // Display controls when the block is clicked on.
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
				),
				el( 'div', { className: props.className },
					el( 'div', {
						className: attributes.mediaID ? 'nelio-testimonial-image image-active' : 'nelio-testimonial-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
					},
						el( blocks.MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
									className: attributes.mediaID ? 'image-button' : 'button button-large',
									onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
					el( 'div', {
						className: 'nelio-testimonial-content', style: { textAlign: alignment } },
						el( blocks.RichText, {
							tagName: 'p',
							inline: true,
							placeholder: i18n.__( 'Write the testimonial here...' ),
							value: attributes.testimonial,
							onChange: function( newTestimonial ) {
								props.setAttributes( { testimonial: newTestimonial } );
							},
							focus: focusedEditable === 'testimonial' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'testimonial' } ) );
							},
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							className: 'nelio-testimonial-name',
							inline: false,
							placeholder: i18n.__( 'Name' ),
							value: attributes.name,
							onChange: function( newName ) {
								props.setAttributes( { name: newName } );
							},
							focus: focusedEditable === 'name' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'name' } ) );
							},
						} ),
						el( blocks.RichText, {
							tagName: 'p',
							className: 'nelio-testimonial-position',
							inline: false,
							placeholder: i18n.__( 'Position' ),
							value: attributes.position,
							onChange: function( newPosition ) {
								props.setAttributes( { position: newPosition } );
							},
							focus: focusedEditable === 'position' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'position' } ) );
							}
						} ),
					),
				)
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			var alignment = props.attributes.alignment;
			return (
				el( 'div', { className: props.className },
					attributes.mediaURL &&
					el( 'div', { className: 'nelio-testimonial-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'nelio-testimonial-content', style: { textAlign: attributes.alignment } },
						attributes.testimonial && el( 'p', {}, attributes.testimonial ),
						el( 'p', { className: 'nelio-testimonial-name' }, attributes.name ),
						attributes.position && el( 'p', { className: 'nelio-testimonial-position' }, attributes.position )
					)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);
