import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';

class Input extends StatefulWidget {
  final String label;
  final TextEditingController textController;
  final TextInputType inputType;
  final bool obscure;

  const Input(
      {Key? key,
      this.label = '',
      this.inputType = TextInputType.text,
      this.obscure = false,
      required this.textController})
      : super(key: key);

  @override
  _InputState createState() => _InputState();
}

class _InputState extends State<Input> with SingleTickerProviderStateMixin {
  final FocusNode _focus = FocusNode();
  late Animation<double> animation;
  late Animation<double> animationSize;
  late AnimationController controller;
  Color labelColor = const Color(0xFF505050);
  double factor = 0;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onFocusChange);
    controller = AnimationController(
        duration: const Duration(milliseconds: 200), vsync: this);
    animation = Tween<double>(begin: 0, end: 80).animate(controller);
    animation.addListener(() {
      setState(() {});
    });
    animationSize = Tween<double>(begin: 24, end: 18).animate(controller);
    animationSize.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _focus.removeListener(_onFocusChange);
    _focus.dispose();
    controller.dispose();
    super.dispose();
  }

  void _onFocusChange() {
    if (_focus.hasFocus) {
      if (widget.textController.text.isEmpty) {
        controller.forward();
      }
      setState(() {
        factor = 1;
      });
    } else {
      setState(() {
        factor = 0;
      });
      if (widget.textController.text.isEmpty) {
        controller.reverse();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (animation.isCompleted) {
      setState(() {
        labelColor = const Color(0xFF0256FA);
      });
      if (!_focus.hasFocus) {
        setState(() {
          labelColor = const Color(0xFF505050);
        });
      }
    }
    if (animation.isDismissed) {
      setState(() {
        labelColor = const Color(0xFF505050);
      });
    }
    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.75,
      height: 100,
      child: Stack(alignment: Alignment.centerLeft, children: [
        Container(
          margin: EdgeInsets.only(bottom: animation.value),
          child: Text(widget.label,
              style:
                  TextStyle(fontSize: animationSize.value, color: labelColor)),
        ),
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: widget.textController,
              onChanged: (value) {},
              focusNode: _focus,
              autofocus: false,
              keyboardType: widget.inputType,
              style: const TextStyle(fontSize: 22, color: Color(0xFF8C8C8C)),
              decoration: const InputDecoration(border: InputBorder.none),
              textAlignVertical: TextAlignVertical.bottom,
              obscureText: widget.obscure,
            ),
            Stack(alignment: Alignment.center, children: [
              Container(
                color: const Color(0xFF505050),
                width: MediaQuery.of(context).size.width,
                height: 3,
              ),
              AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                color: const Color(0xFF0256FA),
                width: MediaQuery.of(context).size.width * factor,
                height: 3,
              )
            ])
          ],
        )
      ]),
    );
  }
}
